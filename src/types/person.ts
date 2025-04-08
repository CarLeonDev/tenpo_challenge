export type Person = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  birthday: Date
  gender: "female" | "male" | "other"
  website: string
  address: Address
}

export type Address = {
  id: number
  street: string
  streetName: string
  buildingNumber: string
  city: string
  zipcode: string
  country: string
}

export type PersonApiResponse = {
  data: Person[]
  total: number
}