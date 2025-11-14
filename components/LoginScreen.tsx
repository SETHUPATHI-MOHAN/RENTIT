import React, { useState } from 'react';
import { Role } from '../types';
import { mockUsers, mockDrivers, mockOwners, mockAdmins } from '../data/mockData';
import { Car, User, HardHat, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
}

const RoleCard: React.FC<{
  role: Role;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}> = ({ role, icon, description, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border ${
      isSelected
        ? 'border-primary-500 ring-2 ring-primary-500'
        : 'border-gray-200 dark:border-gray-700'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{role} Portal</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  </button>
);


const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [username, setUsername] = useState('');

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    switch (role) {
      case Role.USER:
        setUsername(mockUsers[0].email);
        break;
      case Role.DRIVER:
        setUsername(mockDrivers[0].email);
        break;
      case Role.OWNER:
        setUsername(mockOwners[0].email);
        break;
      case Role.ADMIN:
        setUsername(mockAdmins[0].email);
        break;
    }
  };

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  const roles = [
    { role: Role.USER, icon: <User size={28} />, description: "Rent a vehicle, hire a driver, or both." },
    { role: Role.DRIVER, icon: <HardHat size={28} />, description: "Manage your schedule and accept jobs." },
    { role: Role.OWNER, icon: <Car size={28} />, description: "List your vehicles and manage bookings." },
    { role: Role.ADMIN, icon: <ShieldCheck size={28} />, description: "Oversee the entire platform operation." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-primary-600 dark:text-primary-400">RentIt</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Your one-stop platform for vehicle and driver rentals.</p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">1. Select a portal to continue</p>
      </div>
      
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map(({ role, icon, description }) => (
          <RoleCard
            key={role}
            role={role}
            icon={icon}
            description={description}
            onClick={() => handleRoleSelect(role)}
            isSelected={selectedRole === role}
          />
        ))}
      </div>

      {selectedRole && (
        <div className="mt-8 max-w-sm w-full text-center transition-opacity duration-500 ease-in-out">
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">2. Login with mock user</p>
            <div className="mb-4 text-left">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username (demo)
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm cursor-not-allowed text-gray-500 dark:text-gray-400"
                />
            </div>
            <button
                onClick={handleLogin}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
                Login as {selectedRole}
            </button>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2024 RentIt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginScreen;