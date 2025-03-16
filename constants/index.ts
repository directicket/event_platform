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