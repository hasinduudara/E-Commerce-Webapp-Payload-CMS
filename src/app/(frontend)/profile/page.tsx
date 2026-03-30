'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Sri Lanka',
  })
  
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (user) {
      setFormData({
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
        country: user.address?.country || 'Sri Lanka',
      })
      
      if (user.profileImageURL) {
        setProfilePhotoPreview(user.profileImageURL)
      }
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setProfilePhotoPreview(URL.createObjectURL(file))
    }
  }

  // Logout Function 
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed', error)
      setMessage('Failed to log out. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    let currentPhotoUrl = profilePhotoPreview 

    try {
      if (selectedFile) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
        if (!apiKey) throw new Error('Imgbb API Key is missing in .env')

        const imageFormData = new FormData()
        imageFormData.append('image', selectedFile)

        const imageRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: imageFormData,
        })

        if (!imageRes.ok) throw new Error('Image upload failed to Imgbb')
        
        const imageData = await imageRes.json()
        currentPhotoUrl = imageData.data.url 
      }

      const updateRes = await fetch(`/api/users/${user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email, 
          phoneNumber: formData.phoneNumber,
          profileImageURL: currentPhotoUrl,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          }
        }),
      })

      if (!updateRes.ok) throw new Error('Profile update failed (Email might already be in use)')
      
      setMessage('Profile updated successfully!')
      setSelectedFile(null)
      
      setTimeout(() => {
        window.location.reload()
      }, 1500)

    } catch (error: any) {
      console.error(error)
      setMessage(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Premium Loading State
  if (authLoading || !user) return (
    <div className="min-h-screen bg-stone-50 flex justify-center items-center font-sans">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading profile...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-stone-50 pt-10 pb-20 px-6 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 animate-fade-in-up">
        
        {/* Header and Logout Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
          <button 
            onClick={handleLogout} 
            type="button"
            className="group flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 font-bold transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Log Out
          </button>
        </div>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-xl mb-8 text-sm font-bold text-center border ${message.includes('successfully') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Profile Photo Section - Clean & Centered */}
          <div className="flex flex-col items-center gap-5 bg-stone-50/50 p-8 rounded-[2rem] border border-gray-100">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              {profilePhotoPreview ? (
                <Image src={profilePhotoPreview} alt="Profile Photo" fill unoptimized className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </div>
              )}
            </div>
            <input required={false} type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()} 
              className="text-sm font-bold text-gray-700 hover:text-black hover:bg-gray-50 transition-all px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
            >
              Change Photo
            </button>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input required={false} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" placeholder="07X XXX XXXX" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Shipping Address</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
              <input required={false} type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" placeholder="No. 123, Main Street" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input required={false} type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" placeholder="Colombo" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State / Province</label>
                <input required={false} type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" placeholder="Western Province" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                <input required={false} type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" placeholder="00100" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                <input required={false} type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none bg-stone-50 focus:bg-white text-gray-900" />
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-black/20 hover:-translate-y-1 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
            >
              {loading ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}} />
    </main>
  )
}