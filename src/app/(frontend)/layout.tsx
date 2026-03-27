import React from 'react'
import './styles.css'
import { CartProvider } from '../../context/CartContext'
import { AuthProvider } from '../../context/AuthContext'
import Header from '../../components/Header'

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Built with Payload CMS and Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap with AuthProvider first, then CartProvider */}
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}