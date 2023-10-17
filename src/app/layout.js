import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sales Landing Page with Next, AWS & Neon',
  description: 'Sales Landing Page with Next + Neon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300`}>{children}</body>
    </html>
  )
}
