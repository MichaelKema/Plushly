// SearchButton.js
import React from 'react';

function SearchButton() {
  const handleClick = () => {
    console.log('Search icon clicked!');
  };

  return (
    <button className="search-button" onClick={handleClick}>
      <i className="fas fa-search" />
    </button>
  );
}

export default SearchButton;