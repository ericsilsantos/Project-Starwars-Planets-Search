import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './StarwarsContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [data, setdata] = useState();
  const [renderData, setRenderData] = useState();
  const [loading, setLoading] = useState(true);

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
    // console.log(value);
    const newData = data.filter((planet) => planet.name.includes(value));
    setRenderData(newData);
  };

  const handleClick = (filter) => {
    // console.log(parseInt(data[0][filter.column]));
    let newData = {};
    switch (filter.comparison) {
    case 'menor que': {
      newData = data.filter((planet) => (
        parseInt(planet[filter.column], 10) < parseInt(filter.value, 10)));
      // setRenderData(newData);
      break;
    }
    case 'maior que': {
      newData = data.filter((planet) => (
        parseInt(planet[filter.column], 10) > parseInt(filter.value, 10)));
      // setRenderData(newData);
      break;
    }
    case 'igual a': {
      newData = data.filter((planet) => planet[filter.column] === filter.value);
      // setRenderData(newData);
      break;
    }
    default:
      console.log('Erro');
    }
    setRenderData(newData);
  };

  return (
    <Context.Provider value={ { renderData, loading, handleChange, handleClick } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default Provider;
