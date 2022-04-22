import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './StarwarsContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [data, setdata] = useState();
  const [renderData, setRenderData] = useState();
  const [loading, setLoading] = useState(true);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  async function fetchData() {
    const results = await fetchAPI();
    setdata(results);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let newData = [];

    if (filterByNumericValues.length === 0) {
      setRenderData(data);
    } else {
      filterByNumericValues.forEach((fil) => {
        const dataToFilter = newData.length === 0 ? data : newData;
        switch (fil.comparison) {
        case 'menor que': {
          newData = dataToFilter.filter((planet) => (
            parseInt(planet[fil.column], 10) < parseInt(fil.value, 10)));
          break;
        }
        case 'maior que': {
          newData = dataToFilter.filter((planet) => (
            parseInt(planet[fil.column], 10) > parseInt(fil.value, 10)));
          break;
        }
        case 'igual a': {
          newData = dataToFilter.filter((planet) => (
            parseInt(planet[fil.column], 10) === parseInt(fil.value, 10)));
          break;
        }
        default:
          console.log('Erro');
        }
      });
      setRenderData(newData);
    }
  }, [data, filterByNumericValues]);

  const value = {
    data,
    renderData,
    loading,
    filterByNumericValues,
    setfilterByNumericValues,
    setRenderData,
    options,
    setOptions,
    filter,
    setFilter };

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
