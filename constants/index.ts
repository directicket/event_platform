export const headerLinks = [
    {
      label: 'HOME',
      route: '/',
    },
    {
      label: 'CREATE',
      route: '/events/create',
    },
    {
      label: 'DASHBOARD',
      route: '/profile',
    },
    {
      label: 'BLOG',
      route: '/blog',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    expiryDate: new Date(),
    quantity: 1,
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }