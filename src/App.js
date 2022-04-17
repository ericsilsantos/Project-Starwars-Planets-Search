import React from 'react';
import StarwarsContext from './context/StarwarsProvider';
import Table from './components/Table';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';

function App() {
  return (
    <StarwarsContext>
      <h1>PROJECT STARWARS</h1>
      <SearchBar />
      <FilterBar />
      <Table />
    </StarwarsContext>
  );
}

export default App;
