'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define types
interface Product {
  id: string
  title: string
  price: number
  image?: any
}

interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  // Add item to cart or increase quantity by specified amount
  addToCart: (product: Product, quantityToAdd: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void 
  cartTotal: number
  cartCount: number
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Add item to cart or increase quantity by specified amount
  const addToCart = (product: Product, quantityToAdd: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd } 
            : item
        )
      }
      return [...prevCart, { product, quantity: quantityToAdd }] 
    })
    
    // Alert the user about the added item and quantity
    alert(`${quantityToAdd} x ${product.title} added to cart!`)
  }

  // Remove item from cart completely
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  // Clear the entire cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}