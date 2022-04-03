import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url"

const config = {
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: 'v1',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
}

export const client = createClient(config)

export const urlFor = src => createImageUrlBuilder(client).image(src)