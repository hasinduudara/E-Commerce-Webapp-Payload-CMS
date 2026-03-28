'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define the User type based on our Payload Collection
interface User {
  id: string
  email: string
  name?: string
  phoneNumber?: string
  role?: 'admin' | 'user' 
  profileImageURL?: string 
  address?: {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch the currently logged-in user from Payload CMS
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/me?t=${new Date().getTime()}`, { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })

        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setUser(data.user)
          } else {
            setUser(null) 
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch user session", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)