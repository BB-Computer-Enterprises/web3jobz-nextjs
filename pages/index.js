import Head from 'next/head'
import Header from '@components/Header';
import Footer from '@components/Footer';
import HomePage from '@components/HomePage';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3J☁bs</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <script src="https://ten-fetching.web3jobz.com/script.js" data-site="ZDCAIQIO" defer></script>
        <meta name="description" content="The #1 Web3J☁b Board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <HomePage />
        <Footer />
      </main>

      <footer>
      </footer>
    </div>
  )
}
