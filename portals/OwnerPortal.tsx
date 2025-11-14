
import React, { useState } from 'react';
import { VehicleOwner, Vehicle, Booking, BookingStatus } from '../types';
import { mockVehicles, mockBookings, mockUsers } from '../data/mockData';
import { IndianRupee, Car, Wrench, CheckCircle, XCircle, User as UserIcon, Calendar } from 'lucide-react';

interface OwnerPortalProps {
  owner: VehicleOwner;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const MyVehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <img src={vehicle.imageUrl} alt={vehicle.model} className="w-24 h-16 rounded-md object-cover" />
            <div>
                <p className="font-bold">{vehicle.make} {vehicle.model}</p>
                <p className="text-sm text-gray-500">{vehicle.registration}</p>
                <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${vehicle.isAvailable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                    {vehicle.isAvailable ? 'Available' : 'Booked'}
                </span>
            </div>
        </div>
        <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
            Manage
        </button>
    </div>
);

const BookingRequestCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const user = mockUsers.find(u => u.id === booking.userId);
    const vehicle = mockVehicles.find(v => v.id === booking.vehicleId);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <p className="font-bold text-lg">Request for {vehicle?.make} {vehicle?.model}</p>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                    <p className="flex items-center"><UserIcon size={14} className="mr-2" /> Renter: {user?.name}</p>
                    <p className="flex items-center"><Calendar size={14} className="mr-2" /> Dates: {booking.startDate} to {booking.endDate}</p>
                </div>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle size={18} /> Approve
                </button>
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
                    <XCircle size={18} /> Deny
                </button>
            </div>
        </div>
    );
};

const OwnerPortal: React.FC<OwnerPortalProps> = ({ owner }) => {
  const myVehicles = mockVehicles.filter(v => v.ownerId === owner.id);
  const myVehicleIds = myVehicles.map(v => v.id);
  const myBookings = mockBookings.filter(b => b.vehicleId && myVehicleIds.includes(b.vehicleId));
  const pendingRequests = myBookings.filter(b => b.status === BookingStatus.PENDING);
  
  const totalEarnings = myBookings
    .filter(b => b.status === BookingStatus.COMPLETED)
    .reduce((sum, b) => sum + b.totalCostInr, 0);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Earnings" value={`₹${totalEarnings.toLocaleString('en-IN')}`} icon={<IndianRupee />} />
        <StatCard title="Your Vehicles" value={myVehicles.length.toString()} icon={<Car />} />
        <StatCard title="Pending Requests" value={pendingRequests.length.toString()} icon={<Wrench />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Your Vehicles</h2>
            <div className="space-y-4">
                {myVehicles.map(vehicle => <MyVehicleCard key={vehicle.id} vehicle={vehicle} />)}
                <button className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    + Add New Vehicle
                </button>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-semibold mb-4">New Booking Requests</h2>
            <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                    pendingRequests.map(req => <BookingRequestCard key={req.id} booking={req} />)
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">No new booking requests.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPortal;