import type { Metadata } from 'next'
import { inter, manrope } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'RakshaSetu - Secure E-commerce Platform',
  description: 'Escrow and logistics platform for Indian merchants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
