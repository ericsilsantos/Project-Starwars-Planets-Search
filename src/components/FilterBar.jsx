import React, { useContext } from 'react';
import Context from '../context/StarwarsContext';
import ListFilters from './ListFilters';

function FilterBar() {
  const {
    setfilterByNumericValues,
    data,
    setRenderData,
    options,
    setOptions,
    filter,
    setFilter } = useContext(Context);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleButton = () => {
    const newOptions = options.filter((opt) => opt !== filter.column);
    setFilter((prevState) => ({ ...prevState, column: newOptions[0] }));
    setOptions(newOptions);
    setfilterByNumericValues((prev) => ([...prev, filter]));
  };

  const handleRemoveAllFilters = () => {
    setfilterByNumericValues([]);
    setRenderData(data);
    setOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
    setFilter({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
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
            <option key={ opt } value={ opt }>{opt}</option>
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
        disabled={ options.length === 0 }
        type="button"
        onClick={ handleButton }
      >
        Acionar Filtro
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleRemoveAllFilters }
      >
        Remover Filtros
      </button>
      <ListFilters />
    </div>
  );
}

export default FilterBar;
