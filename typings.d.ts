export interface Image {
  asset: {
    url: string
  }
}

export interface Creator {
  name: string
  _id: string
  address: string
  slug: {
    current: string
  }
  image: Image
  bio: string
}

export interface Collection {
  _id: string
  title: string
  description: string
  nftCollectionName: string
  address: string
  slug: {
    current: string
  }
  creator: Creator
  mainImage: Image
  previewImage: Image
}
