import React from 'react';
import { TagIcon } from '@heroicons/react/24/outline';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ---------- HEADER ---------- */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-md flex justify-center items-center">
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Plushly
          </h1>
          <nav className="mt-4">
            <button className="mr-4 px-3 py-1 rounded-md bg-primary-500 text-white hover:bg-primary-600">
              Login
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* ---------- WRAPPER TO CENTER MAIN CONTENT ---------- */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-1 px-4 py-8 flex flex-col items-center">
          {/* ----- Centered Search Input ----- */}
          <section className="mb-8 w-full">
            <input
              type="text"
              placeholder="Search plushies..."
                  className="
      block
      mx-auto
      w-1/4              /* makes it ~25% of parent width */
      px-4               /* left/right padding */
      py-3               /* top/bottom padding (thicker) */
      border border-gray-300 dark:border-gray-600
      rounded-md
      focus:outline-none focus:ring-2 focus:ring-primary-400
      dark:bg-gray-700 dark:text-gray-100
    "
  />
          </section>

          {/* ----- Centered Plushie Grid ----- */}
          <section className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Featured Plushies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {/* Example Card – copy/paste this block for each plushie */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">

                <div className="p-4">
                  {/* Title + Icon */}
                  <div className="flex items-center">
                    <TagIcon className="inline h-[1em] w-[1em] text-gray-500 dark:text-gray-400 mr-1" />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                      Plushie Name
                    </h3>
                  </div>

                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    Short description or price here.
                  </p>
                  <button className="mt-4 w-full px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    View Details
                  </button>
                </div>
              </div>
              {/* End Example Card */}
              {/* …more cards here */}
            </div>
          </section>
        </main>

        {/* ---------- FOOTER ---------- */}
        <footer className="bg-gray-200 dark:bg-gray-900 py-6">
          <div className="container mx-auto px-4 text-center text-gray-700 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Plushly. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
