import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

const progress = new ProgressBar({
  size: 4,
  color: '#ef4444',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
