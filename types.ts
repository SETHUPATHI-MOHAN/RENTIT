export enum Role {
  USER = 'User',
  DRIVER = 'Driver',
  OWNER = 'Vehicle Owner',
  ADMIN = 'Admin',
}

export enum VehicleType {
  CAR = 'Car',
  BIKE = 'Bike',
  VAN = 'Van',
  TRUCK = 'Truck',
  SUV = 'SUV',
  AUTO_RICKSHAW = 'Auto Rickshaw',
  TEMPO_TRAVELLER = 'Tempo Traveller',
  LORRY = 'Lorry',
  CONTAINER_LORRY = 'Container Lorry',
}

export interface BaseUser {
  id: number;
  name: string;
  email: string;
  profilePictureUrl: string;
}

export interface User extends BaseUser {}

export interface Driver extends BaseUser {
  experience: number; // in years
  rating: number; // 1-5
  licenseUrl: string;
  idUrl: string;
  isVerified: boolean;
  availability: boolean;
}

export interface VehicleOwner extends BaseUser {}

export interface Admin extends BaseUser {}

export interface Vehicle {
  id: number;
  ownerId: number;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  imageUrl: string;
  pricePerDayInr: number;
  location: string;
  isAvailable: boolean;
  registration: string;
  insuranceExpiry: string; // YYYY-MM-DD
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Booking {
  id: number;
  userId: number;
  vehicleId?: number;
  driverId?: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  totalCostInr: number;
  status: BookingStatus;
}