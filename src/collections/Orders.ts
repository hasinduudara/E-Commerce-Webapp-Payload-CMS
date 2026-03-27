import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    description: 'A summary of all orders placed on the store.',
  },
  access: {
    // Only admins can read all orders. Users should only read their own (simplified for now)
    read: () => true, 
    // Anyone can create an order (e.g., guest checkout)
    create: () => true,
    // Only admins can update orders (e.g., change status)
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    // 1. Customer Details
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'text',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'shippingAddress',
      type: 'textarea',
      required: true,
    },
    
    // 2. Order Items
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'priceAtPurchase',
          type: 'number',
          required: true,
        },
      ],
    },

    // 3. Order Totals & Status
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Cash on Delivery (COD)', value: 'cod' },
        { label: 'Credit Card (Stripe)', value: 'stripe' },
      ],
      defaultValue: 'cod',
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'orderStatus',
      type: 'select',
      options: [
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'processing',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}