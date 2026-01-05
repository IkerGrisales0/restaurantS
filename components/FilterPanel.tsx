export interface Filters {
  price: number[]
  cuisine: string | null
  amenities: {
    terrace: boolean
    wifi: boolean
    petFriendly: boolean
  }
}
