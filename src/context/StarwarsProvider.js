import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './StarwarsContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [data, setdata] = useState();
  const [renderData, setRenderData] = useState();
  const [loading, setLoading] = useState(true);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

  async function fetchData() {
    const results = await fetchAPI();
    setdata(results);
    setRenderData(results);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    const newData = data.filter((planet) => planet.name.includes(value));
    setRenderData(newData);
  };

  const handleClick = (filter) => {
    let newData = {};
    const dataToFilter = filterByNumericValues.length === 0 ? data : renderData;

    switch (filter.comparison) {
    case 'menor que': {
      newData = dataToFilter.filter((planet) => (
        parseInt(planet[filter.column], 10) < parseInt(filter.value, 10)));
      break;
    }
    case 'maior que': {
      newData = dataToFilter.filter((planet) => (
        parseInt(planet[filter.column], 10) > parseInt(filter.value, 10)));
      break;
    }
    case 'igual a': {
      newData = dataToFilter.filter((planet) => planet[filter.column] === filter.value);
      break;
    }
    default:
      console.log('Erro');
    }

    setfilterByNumericValues([...filterByNumericValues, filter]);
    setRenderData(newData);
  };

  const value = {
    renderData,
    loading,
    handleChange,
    handleClick,
    filterByNumericValues };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default Provider;
