import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Store() {
  const [productsAll, setProductsAll] = useState([]); // full list fetched from API
  const [products, setProducts] = useState([]); // visible products (paged)
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 24; // items per page load
  const pageRef = useRef(0);
  const sentinelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        // try backend API first
        let res = await fetch('/api/products');
        if (!res.ok) {
          // fallback to static JSON
          res = await fetch('/products.json');
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProductsAll(Array.isArray(data) ? data : []);
          // initialize first page
          pageRef.current = 1;
          setProducts(Array.isArray(data) ? data.slice(0, pageSize) : []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // load more when sentinel enters view
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading && !loadingMore) {
            // load next page
            const total = productsAll.length;
            const nextPage = pageRef.current + 1;
            const start = (nextPage - 1) * pageSize;
            if (start >= total) return; // nothing more

            setLoadingMore(true);
            // mimic async load (but data is local)
            setTimeout(() => {
              const nextItems = productsAll.slice(start, start + pageSize);
              setProducts((prev) => prev.concat(nextItems));
              pageRef.current = nextPage;
              setLoadingMore(false);
            }, 150);
          }
        });
      },
      { root: null, rootMargin: '400px', threshold: 0.1 }
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [productsAll, loading, loadingMore]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <h1 className="text-3xl font-semibold text-center">Store</h1>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {loading && <div className="text-center">Loading products…</div>}
        {error && <div className="text-center text-red-400">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}
            >
            {products && products.length > 0 ? (
              products.map((p) => {
                const url = p.url || '#';
                const img = p.images && p.images[0];
                // lightweight inline SVG placeholder (no external network)
                const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533"><rect width="100%" height="100%" fill="#111827"/><text x="50%" y="50%" fill="#9ca3af" font-family="Arial, sans-serif" font-size="20" dominant-baseline="middle" text-anchor="middle">No image</text></svg>'
                )}`;

                const renderStars = (r) => {
                  if (!r) return null;
                  const full = Math.round(Number(r));
                  return (
                    <div className="text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < full ? 'text-yellow-400' : 'text-zinc-600'}>★</span>
                      ))}
                    </div>
                  );
                };

                return (
                  <div key={p.asin} className="rounded-xl border border-zinc-700/60 bg-zinc-900/60 overflow-hidden">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-full aspect-[3/4] bg-zinc-800 flex items-center justify-center overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={p.title || 'product image'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = placeholder;
                            }}
                          />
                        ) : (
                          <img src={placeholder} alt="No image" className="w-full h-full object-cover" />
                        )}
                      </div>
                    </a>

                    <div className="p-3 space-y-1">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium line-clamp-2 block hover:underline">
                        {p.title}
                      </a>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-zinc-400">{p.brand}</div>
                          <div className="text-sm font-semibold">{p.price}</div>
                        </div>
                        <div className="ml-2">{renderStars(p.rating)}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-zinc-400">No products available</div>
            )}
            </div>

            <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
            {loadingMore && <div className="text-center py-6">Loading more…</div>}
          </>
        )}
      </main>
    </>
  );
}

export default Store;
