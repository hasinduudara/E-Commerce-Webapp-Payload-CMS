'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Address එකේ අලුත් fields ටික State එකට එකතු කළා
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
        // අලුත් Address fields ටික Load කරනවා
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
          phoneNumber: formData.phoneNumber,
          profileImageURL: currentPhotoUrl,
          // Address එක Group එකක් විදියට යවනවා
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          }
        }),
      })

      if (!updateRes.ok) throw new Error('Profile update failed')
      
      setMessage('Profile updated successfully!')
      setSelectedFile(null)
      
      setTimeout(() => {
        window.location.reload()
      }, 1500)

    } catch (error) {
      console.error(error)
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) return <div className="min-h-screen bg-stone-50 p-8 flex justify-center items-center text-black">Loading...</div>

  return (
    <main className="min-h-screen bg-stone-50 p-4 md:p-8 text-black font-sans">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-tight">Edit Profile</h1>
        
        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-2xl">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
              {profilePhotoPreview ? (
                <Image src={profilePhotoPreview} alt="Profile Photo" fill unoptimized className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </div>
              )}
            </div>
            <input required={false} type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition px-4 py-2 bg-blue-50 rounded-lg">
              Change Profile Photo
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required type="email" name="email" value={formData.email} readOnly className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required={false} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="07X XXX XXXX" />
              </div>
            </div>
          </div>

          {/* අලුත් Address Section එක */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Shipping Address</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input required={false} type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="No. 123, Main Street" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required={false} type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="Colombo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                <input required={false} type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="Western Province" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input required={false} type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" placeholder="00100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input required={false} type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-3 bg-stone-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-gray-400 shadow-md hover:shadow-lg hover:-translate-y-0.5">
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