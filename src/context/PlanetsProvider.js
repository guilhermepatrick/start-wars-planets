import React, { useEffect, useMemo, useState } from 'react';
import getPlanets from '../helpers/api';
import PlanetsContext from './PlanetsContext';

export default function Planet({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then((result) => setPlanets(result));
  }, []);

  useEffect(() => {
    setFilteredPlanets(planets.filter((el) => el.name.toLowerCase()
      .includes(filterByName.toLowerCase())));
  }, [filterByName, planets]);

  const value = useMemo(
    () => ({
      filteredPlanets,
      filterByName,
      setFilterByName,
    }),
    [filteredPlanets, filterByName],
  );

  return (
    <PlanetsContext.Provider value={ value }>{children}</PlanetsContext.Provider>
  );
}

Planet.propTypes = {}.isRequired;
