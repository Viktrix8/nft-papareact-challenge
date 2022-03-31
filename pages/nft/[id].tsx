import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

const NFTDropPage = () => {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-800 to-rose-500 py-2 lg:col-span-4 lg:min-h-screen">
        <div className="w-44 rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2 lg:h-96 lg:w-72">
          <img
            src="https://links.papareact.com/8sg"
            alt="a picture of an ape"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div className="space-y-2 p-5 text-center">
          <h1 className="text-4xl font-bold text-white">PAPAFAM Apes</h1>
          <h2 className="text-xl text-gray-300">
            A collection of PAPAFAM Apes who live & breath React!
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The{' '}
            <span className="font-extrabold underline decoration-pink-600/50">
              PAPAFAM
            </span>{' '}
            NFT Market Place
          </h1>
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
            src="https://links.papareact.com/bdy"
            alt="picures of apes"
            className="w-80 object-cover pb-10 lg:h-40"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            The PAPAFAM Ape Coding Club | NFT Drop
          </h1>

          <p className="pt-2 text-xl text-green-500">13 / 21 NFT's claimed</p>
        </div>

        {/* Mint Button */}
        <button className="mt-10 h-16 w-full rounded-full bg-red-500 font-bold text-white">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
