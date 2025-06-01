// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }

  export type createBanksParams = {
    userId: string
    accountNumber: string
    bankName: string
    accountName?: string 
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageURL: string
      startDateTime: Date
      expiryDate: Date
      quantity: number
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageURL: string
      description: string
      location: string
      startDateTime: Date
      expiryDate: Date
      quantity: number
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type DeleteEventParams = {
    eventId: string
    path: string
  }
  
  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetEventsByUserParams = {
    query?: string
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }
  
  export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageURL: string
    location: string
    startDateTime: Date
    expiryDate: Date
    quantity: number
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }

  // ====== TAG PARAMS
  export type CreateTagParams = {
    name: string
    ownerId: string
    createdAt: Date
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  
  