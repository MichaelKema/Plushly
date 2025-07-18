import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
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
    { Icon: MagnifyingGlassIcon, label: 'Browse' },
    { Icon: TagIcon,            label: 'All Plushies' },
    { Icon: SparklesIcon,       label: 'New Arrivals' },
    { Icon: GiftIcon,           label: 'Deals Discounts' },
    { Icon: Squares2X2Icon,     label: 'Categories' },
    { Icon: InformationCircleIcon, label: 'About' },
    { Icon: PhoneIcon,            label: 'Contact' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-gray-200">
      {/* Top Info Bar */}
      <div className="flex justify-between items-center text-xs px-4 py-2 bg-gray-800">
        
        <div className="flex space-x-4">

        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900">
        {/* Middle Row */}
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div /> {/* left spacer */}
          <a href="/" className="text-3xl font-bold text-white">Plushly</a>
          <div className="flex items-center space-x-6">
            

            <div className="relative">
              <ShoppingBagIcon className="h-2 w-2 text-gray-200 flex-shrink-0" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </div>
          </div>
        </div>

        {/* Bottom Nav with full-width grid */}
        <nav className="w-full bg-gray-900 border-t border-gray-800">
          <ul className="grid grid-cols-7 items-center gap-y-4 gap-x-6 py-3 px-6 text-sm uppercase text-gray-200">
            {navItems.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center hover:text-indigo-400 whitespace-nowrap"
              >
                {/* Top Bar */}
                <Icon className="w-1/7 h-auto" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Rest of page */}
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to Plushly</h1>
      </main>
    </div>
  );
}
