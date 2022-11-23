import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetTr from './PlanetTr';

function Table() {
  const { filteredPlanetsByName, filters } = useContext(PlanetsContext);
  let planets = filteredPlanetsByName;
  const sortOptions = filters.filterBySort.order;

  if (sortOptions) {
    const sortColumn = [sortOptions.column];
    planets = filteredPlanetsByName.sort((a, b) => {
      if (sortOptions.sort === 'ASC') {
        const myReturn = a[sortColumn] - b[sortColumn];
        if (a[sortColumn] === 'unknown') {
          return Infinity - b[sortColumn];
        }
        if (b[sortColumn] === 'unknown') {
          return a[sortColumn] - Infinity;
        }
        return myReturn;
      }
      if (sortOptions.sort === 'DESC') {
        const myReturn = b[sortColumn] - a[sortColumn];
        return myReturn;
      }
      return planets;
    });
  }

  return (
    <table className="table table-dark table-striped">
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
