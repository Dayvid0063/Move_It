export type Car = {
  id: string
  name: string
  year: number
  images: string[]
  mainImage: string
  capacity: number
  features: {
    hasAC: boolean
    hasLeatherSeats: boolean
    hasGPS: boolean
    hasBluetooth: boolean
    hasUSBPort: boolean
  }
  status: 'available' | 'rented' | 'maintenance'
  plateNumber: string
  lastMaintenance: string
}
