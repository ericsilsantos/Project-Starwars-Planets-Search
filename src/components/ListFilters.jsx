import React, { useContext } from 'react';
import Context from '../context/StarwarsContext';

function ListFilters() {
  const { filterByNumericValues } = useContext(Context);

  return (
    <div>
      { filterByNumericValues.length === 0 ? false : (
        filterByNumericValues.map((filter, index) => (
          <div key={ index }>
            <span>{filter.column}</span>
            <span>  </span>
            <span>{filter.comparison}</span>
            <span>  </span>
            <span>{filter.value}</span>
            <span>  </span>
            <button type="button">Remover</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ListFilters;
