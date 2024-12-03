export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'About Us',
      route: '/about',
    },
    {
      label: 'Create Ticket',
      route: '/events/create',
    },
    {
      label: 'Your Tickets',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }