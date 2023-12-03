import '../css/globals.css';
import Head from 'next/head'
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matematikk",
  description: "Oppgaver i matematikk",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="no">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
