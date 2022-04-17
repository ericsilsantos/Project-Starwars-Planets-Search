import React from 'react';
import Context from '../context/StarwarsContext';
import BodyTable from './BodyTable';

function Table() {
  return (
    <Context.Consumer>
      {({ loading }) => (
        <div>
          { loading ? <div>Carregando...</div> : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rotation Period</th>
                  <th>Orbital Period</th>
                  <th>Diameter</th>
                  <th>Climate</th>
                  <th>Gravity</th>
                  <th>Terrain</th>
                  <th>Surface Water</th>
                  <th>Population</th>
                  <th>Films</th>
                  <th>Created</th>
                  <th>Edited</th>
                  <th>URL</th>
                </tr>
              </thead>
              <BodyTable />
            </table>
          )}
        </div>
      )}
    </Context.Consumer>
  );
}

export default Table;
