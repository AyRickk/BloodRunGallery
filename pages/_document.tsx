import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="La Galerie photo de la Blood Run"
          />
          <meta property="og:site_name" content="galerie.bloodrun.fr" />
          <meta
            property="og:description"
            content="La Galerie photo de la Blood Run"
          />
          <meta property="og:title" content="Galerie photo Bloodrun" />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
