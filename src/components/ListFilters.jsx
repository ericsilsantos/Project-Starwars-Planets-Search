import React, { useContext } from 'react';
import Context from '../context/StarwarsContext';

function ListFilters() {
  const {
    filterByNumericValues,
    setfilterByNumericValues,
    options,
    setOptions,
    setFilter } = useContext(Context);

  const handleRemove = (filter) => {
    const { column } = filter;
    const newFilters = filterByNumericValues.filter((fil) => fil.column !== column);
    setfilterByNumericValues(newFilters);
    if (options.length === 0) {
      setOptions([column]);
      setFilter((prevState) => ({ ...prevState, column }));
    } else setOptions([...options, column]);
  };

  return (
    <div>
      { filterByNumericValues.length === 0 ? false : (
        filterByNumericValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>{filter.column}</span>
            <span>  </span>
            <span>{filter.comparison}</span>
            <span>  </span>
            <span>{filter.value}</span>
            <span>  </span>
            <button
              onClick={ () => handleRemove(filter) }
              type="button"
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListFilters;
