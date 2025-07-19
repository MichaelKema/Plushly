import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Store from './Page/Store';
import {
  MagnifyingGlassIcon,
  TagIcon,
  SparklesIcon,
  GiftIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function App() {
  const navItems = [
    { label: 'Browse', to: '/store', Icon: MagnifyingGlassIcon },
    { label: 'All Plushies', to: '/all', Icon: TagIcon },
    { label: 'New Arrivals', to: '/new', Icon: SparklesIcon },
    { label: 'Deals & Discounts', to: '/deals', Icon: GiftIcon },
    { label: 'Categories', to: '/categories', Icon: Squares2X2Icon },
    { label: 'About', to: '/about', Icon: InformationCircleIcon },
    { label: 'Contact', to: '/contact', Icon: PhoneIcon }
  ];

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-gray-900 text-gray-200">
        {/* Top Info Bar (optional) */}
        <div className="flex justify-between items-center text-xs px-4 py-2 bg-gray-800"></div>

        {/* Main Header */}
        <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900">
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
            <div /> {/* left spacer */}
            <Link to="/" className="text-3xl font-bold text-white">Plushly</Link>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6 text-gray-200 flex-shrink-0" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
              </div>
            </div>
          </div>

          {/* Bottom Nav */}
          <nav className="w-full bg-gray-900 border-t border-gray-800">
            <ul className="grid grid-cols-7 items-center gap-y-4 gap-x-6 py-3 px-6 text-sm uppercase text-gray-200">
              {navItems.map(({ label, to, Icon }) => (
                <li key={label} className="flex flex-col items-center hover:text-indigo-400 whitespace-nowrap">
                  <Link to={to} className="flex flex-col items-center">
                    <Icon className="h-6 w-6" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-bold text-center p-8">Welcome to Plushly</h1>} />
            <Route path="/store" element={<Store />} />
            {/* Add more <Route> as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
