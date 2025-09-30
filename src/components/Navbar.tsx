import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, Bell, User, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Sites', href: '/dashboard' },
    { name: 'Alerts', href: '/alerts' },
    { name: 'Reports', href: '/reports' },
    { name: 'Simulator', href: '/simulator' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname.startsWith('/site/');
    }
    return location.pathname === href;
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">RockWatch</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
              <Settings className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200">
                <User className="h-5 w-5" />
                <span className="hidden sm:block text-sm">Admin</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-700">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;