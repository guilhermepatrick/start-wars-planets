import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetTr from './PlanetTr';

function Table() {
  const { planets } = useContext(PlanetsContext);

  return (
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
          <th>Criated</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <PlanetTr key={ planet.name } planet={ planet } />
        ))}
      </tbody>
    </table>
  );
}

export default Table;