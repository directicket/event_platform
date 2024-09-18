export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Ticket',
      route: '/events/create',
    },
    {
      label: 'Manage Tickets',
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