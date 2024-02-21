import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Footer from './components/footer'
const translations = {
  'zh-TW': {
    toc: '目錄',
    search_placeholder: '搜尋⋯⋯',
    edit_this_page: '在 GitHub 編輯這個頁面',
  },
  'en-US': {
    toc: 'Table of Contents',
    search_placeholder: 'Search...',
    edit_this_page: 'Edit this page on GitHub',
  },
}
function localeTranslation(key: string) {
  const router = useRouter()
  const locale = router.locale || 'en-US'
  return translations[locale][key] || translations['en-US'][key]
}
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
    component: Footer,
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: () => localeTranslation('edit_this_page'),
  },
  nextThemes: {
    defaultTheme: 'system',
  },
  gitTimestamp: <></>,
  search: {
    placeholder: () => localeTranslation('search_placeholder'),
  },
  toc: {
    title: () => localeTranslation('toc'),
  },
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-TW', text: '中文' },
  ],
}

export default config
