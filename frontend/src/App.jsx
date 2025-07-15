import React from 'react';
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
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* Top Info Bar */}
      <div className="flex justify-between items-center text-xs px-6 py-2 bg-gray-800">
        <span>🎉 Free Shipping on Plushies Over $50</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-indigo-400">Facebook</a>
          <a href="#" className="hover:text-indigo-400">Twitter</a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-gray-700">
        {/* Middle Row */}
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div /> {/* left spacer */}
          <a href="/" className="text-3xl font-bold text-white">Plushly</a>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-indigo-400">Sign In</a>
            <button><MagnifyingGlassIcon className="h-5 w-5" /></button>
            <div className="relative">
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="bg-gray-900 border-t border-gray-700">
          <ul className="flex justify-center space-x-8 py-3 text-sm uppercase">
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <MagnifyingGlassIcon className="h-4 w-4" />
              <a href="#">Browse</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <TagIcon className="h-4 w-4" />
              <a href="#">All Plushies</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <SparklesIcon className="h-4 w-4" />
              <a href="#">New Arrivals</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <GiftIcon className="h-4 w-4" />
              <a href="#">Deals & Discounts</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <Squares2X2Icon className="h-4 w-4" />
              <a href="#">Categories</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <InformationCircleIcon className="h-4 w-4" />
              <a href="#">About</a>
            </li>
            <li className="flex items-center space-x-1 hover:text-indigo-400">
              <PhoneIcon className="h-4 w-4" />
              <a href="#">Contact</a>
            </li>
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
