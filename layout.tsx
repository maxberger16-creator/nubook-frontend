import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'FlightSaver - AI Travel Assistant',
  description: 'Automated flight rebooking that finds better options faster than airline customer service',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
