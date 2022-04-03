import { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

import { client, urlFor } from '../../lib/sanity'
import { Collection } from '../../typings'

interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [priceInEth, setPriceInEth] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  const nftDrop = useNFTDrop(collection.address)

  useEffect(() => {
    ;(async () => {
      if (!nftDrop) return
      setLoading(true)
      const claimedSupply = await nftDrop.totalClaimedSupply()
      const totalSupply = await nftDrop.totalSupply()

      setClaimedSupply(Number(claimedSupply.toString()))
      setTotalSupply(Number(totalSupply.toString()))
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!nftDrop) return
      setLoading(true)
      const claimCondition = await nftDrop.claimConditions.getAll()
      setPriceInEth(claimCondition[0].currencyMetadata.displayValue)
      setLoading(false)
    })()
  }, [nftDrop])

  const mintNft = async () => {
    if (!nftDrop || !address) return
    setLoading(true)
    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, 1)
      .then(async (tx) => {
        console.log(tx[0].receipt)
        toast.success('Hooray! you successfully minted an NFT!', {
          duration: 8000,
          style: {
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
            backgroundColor: 'green',
          },
        })
        setClaimedSupply(claimedSupply + 1)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Something went wrong while minting the NFT', {
          style: {
            color: 'red',
            fontSize: '17px',
            padding: '20px',
            fontWeight: 'bolder',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <Toaster position="bottom-center" />
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-800 to-rose-500 py-2 lg:col-span-4 lg:min-h-screen">
        <div className="w-44 rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2 lg:h-96 lg:w-72">
          <img
            src={urlFor(collection.previewImage).url()}
            alt="a picture of an ape"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div className="space-y-2 p-5 text-center">
          <h1 className="text-4xl font-bold text-white">
            {collection.nftCollectionName}
          </h1>
          <h2 className="text-xl text-gray-300">{collection.description}</h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href="/">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
                PAPAFAM
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          {address ? (
            <button
              className="rounded-full bg-gray-500 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
              onClick={() => disconnect()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
              onClick={() => connectWithMetamask()}
            >
              Sign In
            </button>
          )}
        </header>

        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-pink-600">
            Yo're logged with wallet {address.slice(0, 5)}...{address.slice(-4)}
          </p>
        )}

        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            src={urlFor(collection.mainImage).url()}
            alt="picures of apes"
            className="w-80 object-cover pb-10 lg:h-40"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500 duration-200">
              Loading supply count
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500 duration-200">
              {claimedSupply.toString()} / {totalSupply} NFT's claimed
            </p>
          )}
          {loading && (
            <img
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt="loading animation"
              className="h-80 w-80 object-contain"
            />
          )}
        </div>

        {/* Mint Button */}
        <button
          className="mt-10 h-16 w-full rounded-full bg-red-500 font-bold text-white disabled:bg-gray-500"
          disabled={loading || claimedSupply === totalSupply || !address}
          onClick={mintNft}
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply ? (
            <>Sold Out</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : (
            <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0] {
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      }
    }
  }`

  const collection = await client.fetch(query, {
    id: params?.id,
  })

  const collectionExists = collection._id === undefined

  if (collectionExists) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: collection,
    },
  }
}
