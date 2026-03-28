import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // Enable Payload's built-in authentication (Email & Password)
  auth: true,
  
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