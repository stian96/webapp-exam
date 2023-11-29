import { ActivityProvider } from "@/hooks/ActivityContext"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muscle Friends",
  description: "A one-stop trip to exercise town. Yeehaw",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ActivityProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ActivityProvider>
  )
}
