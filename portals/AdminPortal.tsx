
import React, { useState } from 'react';
import { Admin, User, Driver, Vehicle, BookingStatus } from '../types';
import { mockUsers, mockDrivers, mockOwners, mockVehicles, mockBookings } from '../data/mockData';
import { Users, HardHat, Car, IndianRupee, CheckCircle, XCircle } from 'lucide-react';

interface AdminPortalProps {
  admin: Admin;
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

const AdminPortal: React.FC<AdminPortalProps> = ({ admin }) => {
  const [activeTab, setActiveTab] = useState('drivers');
  const totalRevenue = mockBookings.filter(b => b.status === BookingStatus.COMPLETED).reduce((sum, b) => sum + b.totalCostInr, 0);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={<IndianRupee />} />
        <StatCard title="Total Users" value={(mockUsers.length + mockDrivers.length + mockOwners.length).toString()} icon={<Users />} />
        <StatCard title="Total Drivers" value={mockDrivers.length.toString()} icon={<HardHat />} />
        <StatCard title="Total Vehicles" value={mockVehicles.length.toString()} icon={<Car />} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('drivers')} className={`${activeTab === 'drivers' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                    Manage Drivers
                </button>
                <button onClick={() => setActiveTab('users')} className={`${activeTab === 'users' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                    Manage Users & Owners
                </button>
                <button onClick={() => setActiveTab('vehicles')} className={`${activeTab === 'vehicles' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                    Manage Vehicles
                </button>
            </nav>
        </div>
        <div className="p-6">
            <div className="overflow-x-auto">
                {activeTab === 'drivers' && (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {mockDrivers.map(driver => (
                                <tr key={driver.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{driver.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.isVerified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                                            {driver.isVerified ? 'Verified' : 'Pending Verification'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {!driver.isVerified && (
                                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4 flex items-center gap-1"><CheckCircle size={16}/> Verify</button>
                                        )}
                                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"><XCircle size={16}/> Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                 {activeTab === 'users' && (
                    <p className="text-center py-8 text-gray-500">User management interface would be here.</p>
                )}
                 {activeTab === 'vehicles' && (
                    <p className="text-center py-8 text-gray-500">Vehicle management interface would be here.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;