
import React, { useState, useCallback } from 'react';
import { Role, User, Driver, VehicleOwner, Admin } from './types';
import { mockUsers, mockDrivers, mockOwners, mockAdmins } from './data/mockData';
import LoginScreen from './components/LoginScreen';
import UserPortal from './portals/UserPortal';
import DriverPortal from './portals/DriverPortal';
import OwnerPortal from './portals/OwnerPortal';
import AdminPortal from './portals/AdminPortal';
import Header from './components/Header';

type CurrentUser = 
  | { role: Role.USER; data: User }
  | { role: Role.DRIVER; data: Driver }
  | { role: Role.OWNER; data: VehicleOwner }
  | { role: Role.ADMIN; data: Admin };

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const handleLogin = useCallback((role: Role) => {
    switch (role) {
      case Role.USER:
        setCurrentUser({ role, data: mockUsers[0] });
        break;
      case Role.DRIVER:
        setCurrentUser({ role, data: mockDrivers[0] });
        break;
      case Role.OWNER:
        setCurrentUser({ role, data: mockOwners[0] });
        break;
      case Role.ADMIN:
        setCurrentUser({ role, data: mockAdmins[0] });
        break;
      default:
        break;
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const renderPortal = () => {
    if (!currentUser) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    const portalContent = (() => {
      switch (currentUser.role) {
        case Role.USER:
          return <UserPortal user={currentUser.data} />;
        case Role.DRIVER:
          return <DriverPortal driver={currentUser.data} />;
        case Role.OWNER:
          return <OwnerPortal owner={currentUser.data} />;
        case Role.ADMIN:
          return <AdminPortal admin={currentUser.data} />;
        default:
          return <div className="text-red-500">Error: Invalid user role.</div>;
      }
    })();

    return (
      <div className="min-h-screen flex flex-col">
        <Header user={currentUser.data} role={currentUser.role} onLogout={handleLogout} />
        <main className="flex-grow p-4 md:p-8 bg-gray-100 dark:bg-gray-800">
          {portalContent}
        </main>
      </div>
    );
  };

  return <div className="antialiased text-gray-900 dark:text-gray-100">{renderPortal()}</div>;
};

export default App;
