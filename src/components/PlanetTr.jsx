import React from 'react';

function PlanetTr(props) {
  const { planet } = props;
  return (
    <tr>
      <td data-testid="planet-name">{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>
        <ul>
          {planet.films.map((el, index) => (
            <li key={ index + el }>{el}</li>
          ))}
        </ul>
      </td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );
}
PlanetTr.propTypes = {}.isRequired;

export default PlanetTr;
