import React, { useContext } from 'react';
import Context from '../context/StarwarsContext';

function SearchBar() {
  const { data, setRenderData } = useContext(Context);

  const handleChange = ({ target }) => {
    const { value } = target;
    const newData = data.filter((planet) => planet.name.includes(value));
    setRenderData(newData);
  };

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
