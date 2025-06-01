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
    title: 'My Event - Regular Ticket',
    description: 'Buy this ticket to gain access to the venue. Hurry! Stock is very limited.',
    location: 'Abuja, Nigeria',
    imageUrl: '',
    startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // Current date + 1 day
    expiryDate: new Date(),
    quantity: 100,
    categoryId: '',
    price: '3000',
    isFree: false,
    url: '',
  }