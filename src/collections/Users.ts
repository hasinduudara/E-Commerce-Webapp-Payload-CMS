import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // Enable Payload's built-in authentication (Email & Password)
  auth: true,
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
      type: 'textarea',
    },
    // Profile Image (We will link this to an Upload collection later)
    {
      name: 'profileImageURL',
      type: 'text',
    },
  ],
}