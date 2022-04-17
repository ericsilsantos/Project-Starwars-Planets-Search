import React, { useState, useContext } from 'react';
import Context from '../context/StarwarsContext';

function FilterBar() {
  const { handleClick } = useContext(Context);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleChange }
        name="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ handleChange }
        name="value"
        value={ filter.value }
        data-testid="value-filter"
        type="number"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleClick(filter) }
      >
        Acionar Filtro
      </button>
    </div>
  );
}

export default FilterBar;
