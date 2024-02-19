import Document, { Html, Head, Main, NextScript } from "next/document";
import { SkipNavLink } from "nextra-theme-docs";

import { GoogleAnalytics } from '@next/third-parties/google'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <script
            type="module"
            src="https://unpkg.com/@splinetool/viewer@1.0.18/build/spline-viewer.js"
          />
          <GoogleAnalytics gaId="G-9ZBHKW4YJF" />
        </Head>
        <body>
          <SkipNavLink styled />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
