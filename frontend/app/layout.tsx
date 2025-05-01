import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crop recommendation system',
  description: 'Created with Next.js and Tailwind CSS',
  generator: 'bek',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
