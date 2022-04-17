import React, { useContext } from 'react';
import Context from '../context/StarwarsContext';

function SearchBar() {
  const { handleChange } = useContext(Context);
  return (
    <div>
      <label htmlFor="searchBar">
        Pesquisar:
        <input
          data-testid="name-filter"
          id="searchBar"
          onChange={ handleChange }
          type="text"
        />
      </label>
    </div>
  );
}

export default SearchBar;
