import React from 'react';
import { Link } from 'react-router-dom';

function Store() {
  return (
    <div>
      <header>
        <h1>Store Header</h1>
        <Link>Store</Link>
      </header>
      {/* rest of the page content */}
    </div>
  );
}

export default Store;