import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Video Portal - A fullstack video platform" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
