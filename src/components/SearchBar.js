import React from 'react';

function SearchBar() {
  const handleClickSearch = () => {

  };

  return (
    <div>
      <input
        type="radio"
        name="search-radio"
        id="ingredient-search-radio"
        data-testid="ingredient-search-radio"
        // onChange={}
      />
      <input
        type="radio"
        name="search-radio"
        id="name-search-radio"
        data-testid="name-search-radio"
        // onChange={}
      />
      <input
        type="radio"
        name="search-radio"
        id="first-letter-search-radio"
        data-testid="first-letter-search-radio"
        // onChange={}
      />
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="search-input"
        // onChange={}
      />
      <button type="button" data-testid="exec-search-btn" onClick={ handleClickSearch }>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
