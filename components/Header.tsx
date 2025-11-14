import React from 'react';
import { Role, BaseUser } from '../types';
import { Car, LogOut } from 'lucide-react';

interface HeaderProps {
  user: BaseUser;
  role: Role;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, role, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Car className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">RentIt</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
              <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">{role} Portal</p>
            </div>
            <img className="h-10 w-10 rounded-full object-cover" src={user.profilePictureUrl} alt="User" />
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;