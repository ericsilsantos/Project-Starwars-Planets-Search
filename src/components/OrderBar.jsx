import React, { useContext, useState } from 'react';
import Context from '../context/StarwarsContext';

function OrderBar() {
  const [newOrder, setNewOrder] = useState({
    column: 'population',
    sort: '',
  });

  const { setOrder, renderData, setRenderData } = useContext(Context);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    let newData = [];
    setOrder(newOrder);
    if (newOrder.column === 'population') {
      let listKnowPopulation = [];
      const unknown = renderData.filter((planet) => planet.population === 'unknown');
      const known = renderData.filter((planet) => planet.population !== 'unknown');
      if (newOrder.sort === 'ASC') {
        listKnowPopulation = known
          .sort((a, b) => a[newOrder.column] - b[newOrder.column]);
      } else if (newOrder.sort === 'DESC') {
        listKnowPopulation = known
          .sort((a, b) => b[newOrder.column] - a[newOrder.column]);
      }
      newData = [...listKnowPopulation, ...unknown];
    } else if (newOrder.sort === 'ASC') {
      newData = renderData.sort((a, b) => a[newOrder.column] - b[newOrder.column]);
    } else if (newOrder.sort === 'DESC') {
      newData = renderData.sort((a, b) => b[newOrder.column] - a[newOrder.column]);
    }
    setRenderData(newData);
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ASC">
        <input
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          name="sort"
          type="radio"
          onChange={ handleChange }
        />
        Crescente
      </label>
      <label htmlFor="DESC">
        <input
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          name="sort"
          type="radio"
          onChange={ handleChange }
        />
        Descrescente
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClick }
      >
        Ordernar
      </button>
    </div>
  );
}

export default OrderBar;
