import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  
  auth: {
    forgotPassword: {
      // This function generates the HTML content for the password reset email, including a link with the reset token. It also logs the reset link to the console for easy access during development.
      generateEmailHTML: (args) => {
        const token = args?.token || ''
        const userEmail = args?.user?.email || 'User'

        // Create the reset link
        const resetURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`
        
        // Print the link clearly in the VS Code Terminal
        console.log('\n\n===========================================')
        console.log(`🔑 PASSWORD RESET LINK FOR: ${userEmail}`)
        console.log(`👉 CLICK HERE: ${resetURL}`)
        console.log('===========================================\n\n')

        // Return the HTML template for the actual email
        return `
          <h1>Reset Your Password</h1>
          <p>Hello,</p>
          <p>Click the link below to reset your password:</p>
          <a href="${resetURL}">${resetURL}</a>
          <p>If you didn't request this, please ignore this email.</p>
        `
      },
    },
  },
  
  // Access Control: Allow anyone to read user data, but only allow users to update their own data
  access: {
    create: () => true,
    read: () => true,
    update: ({ req: { user } }) => {
      if (user) {
        return { id: { equals: user.id } } // Only allow users to update their own data based on their ID
      }
      return false
    },
  },

  fields: [
    // Role-based Access Control (Admin or User)
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => (user as any)?.role === 'admin',
      },
    },
    // Personal Information
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'address',
      type: 'group', 
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'Street Address',
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          label: 'State / Province',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
          defaultValue: 'Sri Lanka', 
        },
      ],
    },
    // Profile Image Link from Imgbb
    {
      name: 'profileImageURL', 
      type: 'text',
    },
  ],
}