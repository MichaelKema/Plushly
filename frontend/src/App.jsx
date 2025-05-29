import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import './App.css';

const StorePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow p-4 flex justify-center">
        <h1 className="text-2xl font-bold">Welcome to plushly</h1>
      </header>

      {/* Hero Image */}
      <main className="flex-1 w-full max-w-4xl p-4">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="Store Hero"
          className="w-full h-60 object-cover rounded-lg mb-8"
        />

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white p-4 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/300"
                alt={`Product ${id}`}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">Product {id}</h2>
              <p className="text-gray-600">$19.99</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default StorePage;
