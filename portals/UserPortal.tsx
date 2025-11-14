
import React, { useState } from 'react';
import { User, Vehicle, Driver, Booking, VehicleType, BookingStatus } from '../types';
import { mockVehicles, mockDrivers, mockBookings } from '../data/mockData';
import { MapPin, IndianRupee, Star, Calendar, Car, User as UserIcon } from 'lucide-react';

interface UserPortalProps {
  user: User;
}

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
    <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type}</p>
      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
        <MapPin size={16} className="mr-2 text-primary-500" />
        <span>{vehicle.location}</span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 flex items-center">
          <IndianRupee size={18} className="mr-1"/>{vehicle.pricePerDayInr.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500 ml-1">/day</span>
        </p>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
        <img src={driver.profilePictureUrl} alt={driver.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary-200 dark:border-primary-700" />
        <h3 className="text-xl font-bold">{driver.name}</h3>
        <div className="flex items-center text-yellow-500 my-1">
            <Star size={16} className="mr-1 fill-current" />
            <span>{driver.rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{driver.experience} years experience</p>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors mt-4 w-full">
            Hire Driver
        </button>
    </div>
);

const BookingHistoryItem: React.FC<{ booking: Booking }> = ({ booking }) => {
    const statusClasses: {[key in BookingStatus]: string} = {
        [BookingStatus.CONFIRMED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        [BookingStatus.COMPLETED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
                 {booking.vehicleId && <Car className="w-8 h-8 text-primary-500"/>}
                 {booking.driverId && !booking.vehicleId && <UserIcon className="w-8 h-8 text-primary-500"/>}
                 <div>
                    <p className="font-bold text-lg">Booking #{booking.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center"><Calendar size={14} className="mr-2" /> {booking.startDate} to {booking.endDate}</p>
                 </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <p className="text-lg font-semibold text-right sm:text-left">₹{booking.totalCostInr.toLocaleString('en-IN')}</p>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[booking.status]} text-center`}>
                  {booking.status}
              </span>
            </div>
        </div>
    );
};


const UserPortal: React.FC<UserPortalProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('vehicles');

  const userBookings = mockBookings.filter(b => b.userId === user.id);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}!</h1>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('vehicles')} className={`${activeTab === 'vehicles' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Rent a Vehicle
          </button>
          <button onClick={() => setActiveTab('drivers')} className={`${activeTab === 'drivers' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Hire a Driver
          </button>
          <button onClick={() => setActiveTab('history')} className={`${activeTab === 'history' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Booking History
          </button>
        </nav>
      </div>

      {activeTab === 'vehicles' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockVehicles.filter(v => v.isAvailable).map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'drivers' && (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Available Drivers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {mockDrivers.filter(d => d.availability).map(driver => (
                    <DriverCard key={driver.id} driver={driver} />
                ))}
            </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
            <div className="space-y-4">
                {userBookings.length > 0 ? (
                    userBookings.map(booking => <BookingHistoryItem key={booking.id} booking={booking} />)
                ) : (
                    <p className="text-gray-500">You have no booking history.</p>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default UserPortal;