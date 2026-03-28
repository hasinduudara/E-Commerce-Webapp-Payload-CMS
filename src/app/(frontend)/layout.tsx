import React from 'react'
import './styles.css'
import { CartProvider } from '../../context/CartContext'
import { AuthProvider } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer' 
export const metadata = {
  title: 'E-Commerce Store',
  description: 'Built with Payload CMS and Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen"> 
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer /> 
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}