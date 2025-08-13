import React from 'react';
import { Link } from 'react-router-dom';

function Store() {
  const COUNT = 48; // lots of compact tiles

  return (
    <>
      {/* Title stays centered under your global header */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <h1 className="text-3xl font-semibold text-center">Store</h1>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Inline gridTemplateColumns avoids any .grid CSS collisions */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}
        >
          {Array.from({ length: COUNT }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden"
            >
              {/* image area (amazon-ish tile) */}
              <div className="w-full aspect-[3/4] bg-zinc-800 animate-pulse" aria-hidden />
              {/* tiny text rows */}
              <div className="p-3 space-y-2">
                <div className="h-3 w-4/5 rounded bg-zinc-700/70 animate-pulse" aria-hidden />
                <div className="h-3 w-2/5 rounded bg-zinc-700/50 animate-pulse" aria-hidden />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Store;
