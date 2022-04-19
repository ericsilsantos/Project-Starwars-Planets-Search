import React, { useState, useContext } from 'react';
import Context from '../context/StarwarsContext';
import ListFilters from './ListFilters';

function FilterBar() {
  const { handleClick } = useContext(Context);

  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleButton = () => {
    const newOptions = options.filter((opt) => opt !== filter.column);
    setOptions(newOptions);
    handleClick(filter);
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        { options.length !== 0 && (
          options.map((opt) => (
            <option key="opt" value={ opt }>{opt}</option>
          ))
        )}
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
        onClick={ handleButton }
      >
        Acionar Filtro
      </button>
      <ListFilters />
    </div>
  );
}

export default FilterBar;
