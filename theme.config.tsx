import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span className="nx-font-semibold">JUCHUNKO</span>,
  project: {
    link: 'https://github.com/dAAAb/juchunko.com',
  },
  docsRepositoryBase: 'https://github.com/dAAAb/juchunko.com/blob/main',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – JUCHUNKO.COM',
      }
    } else {
      return {
        title: '先進國會・共識未來 - JUCHUNKO.COM',
      }
    }
  },
  head: (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="先進國會・共識未來 - JUCHUNKO.COM" />
      <meta
        property="og:description"
        content="歡迎來到葛如鈞（寶博士）的寶博宇宙說明書，在這裡你可以學會如何操作、使用和召喚多元宇宙列車以及公僕寶博。"
      />
      <meta property="og:image" content="https://juchunko.com/ogimage.png" />
    </>
  ),
  footer: {
    text: '©2024 JUCHUNKO.COM All rights reserved.',
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
  gitTimestamp: <></>,
  search: {
    placeholder: '搜尋⋯⋯',
  },
  toc: {
    title: '目錄',
  },
}

export default config
