import React from 'react'
import './styles.css'
import { CartProvider } from '../../context/CartContext'
import Header from '../../components/Header'

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Built with Payload CMS and Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire app with the Cart Provider */}
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}