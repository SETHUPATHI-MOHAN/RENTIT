
import React, { useState } from 'react';
import { Driver, Booking, BookingStatus } from '../types';
import { mockBookings, mockUsers, mockVehicles } from '../data/mockData';
import { IndianRupee, Star, CheckCircle, XCircle, Calendar, User, Car } from 'lucide-react';

interface DriverPortalProps {
  driver: Driver;
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

const JobRequestCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const user = mockUsers.find(u => u.id === booking.userId);
    const vehicle = booking.vehicleId ? mockVehicles.find(v => v.id === booking.vehicleId) : null;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <p className="font-bold text-lg">Job Request #{booking.id}</p>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                    <p className="flex items-center"><User size={14} className="mr-2" /> Renter: {user?.name}</p>
                    {vehicle && <p className="flex items-center"><Car size={14} className="mr-2" /> Vehicle: {vehicle.make} {vehicle.model}</p>}
                    <p className="flex items-center"><Calendar size={14} className="mr-2" /> Dates: {booking.startDate} to {booking.endDate}</p>
                </div>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle size={18} /> Accept
                </button>
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 transition-colors">
                    <XCircle size={18} /> Decline
                </button>
            </div>
        </div>
    );
};

const DriverPortal: React.FC<DriverPortalProps> = ({ driver }) => {
  const [isAvailable, setIsAvailable] = useState(driver.availability);
  
  const driverBookings = mockBookings.filter(b => b.driverId === driver.id);
  const pendingJobs = driverBookings.filter(b => b.status === BookingStatus.PENDING);
  const totalEarnings = driverBookings
    .filter(b => b.status === BookingStatus.COMPLETED)
    .reduce((sum, b) => sum + b.totalCostInr * 0.8, 0); // Assume 80% cut

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div className="flex items-center space-x-3">
            <span className={`font-medium ${isAvailable ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                {isAvailable ? 'Available for Jobs' : 'Unavailable'}
            </span>
            <label htmlFor="availability-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" id="availability-toggle" className="sr-only" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} />
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isAvailable ? 'transform translate-x-full bg-green-400' : ''}`}></div>
                </div>
            </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Earnings" value={`₹${totalEarnings.toLocaleString('en-IN')}`} icon={<IndianRupee />} />
        <StatCard title="Your Rating" value={`${driver.rating.toFixed(1)} / 5.0`} icon={<Star />} />
        <StatCard title="Completed Trips" value={driverBookings.filter(b => b.status === BookingStatus.COMPLETED).length.toString()} icon={<CheckCircle />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h2 className="text-2xl font-semibold mb-4">New Job Requests</h2>
            <div className="space-y-4">
                {pendingJobs.length > 0 ? (
                    pendingJobs.map(job => <JobRequestCard key={job.id} booking={job} />)
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">No new job requests.</p>
                )}
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-semibold mb-4">Trip History</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3">
                {driverBookings.filter(b => b.status !== BookingStatus.PENDING).map(booking => (
                    <div key={booking.id} className="p-3 border-b dark:border-gray-700 last:border-b-0 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Booking #{booking.id}</p>
                            <p className="text-sm text-gray-500">{booking.startDate} - {booking.endDate}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${booking.status === BookingStatus.COMPLETED ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                            {booking.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;