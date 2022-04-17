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
    console.log(value);
    const newData = data.filter((planet) => planet.name.includes(value));
    setRenderData(newData);
  };

  return (
    <Context.Provider value={ { renderData, loading, handleChange } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf().isRequired,
};

export default Provider;
