import React, { useEffect, useMemo, useState } from 'react';
import getPlanets from '../helpers/api';
import PlanetsContext from './PlanetsContext';

export default function Planet({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredPlanetsByName, setFilterPlanetByName] = useState([]);
  // const [filtersOptions, setFilterOptions] = useState([]);
  const [filters, setFilters] = useState({ filterByNumericValues: [] });

  useEffect(() => {
    getPlanets().then((result) => {
      setPlanets(result);
      setFilteredPlanets(result);
    });
  }, []);

  useEffect(() => {
    const filterArr = filters.filterByNumericValues;
    let planetForEach = planets;
    filterArr.forEach((filter) => {
      const { column, comparison } = filter;
      if (comparison === 'maior que') {
        planetForEach = planetForEach.filter((el) => el[column] > +filter.value);
      }
      if (comparison === 'menor que') {
        planetForEach = planetForEach.filter((el) => el[column] < +filter.value);
      }
      if (comparison === 'igual a') {
        planetForEach = planetForEach.filter((el) => +el[column] === +filter.value);
      }
    });
    setFilteredPlanets(planetForEach);
  }, [filters, planets]);

  useEffect(() => {
    setFilterPlanetByName(
      filteredPlanets.filter((el) => el.name.toLowerCase()
        .includes(filterByName.toLowerCase())),
    );
  }, [filterByName, filteredPlanets]);

  const value = useMemo(
    () => ({
      filteredPlanetsByName,
      filterByName,
      setFilterByName,
      setFilters,
      filters,
    }),
    [filteredPlanetsByName, filterByName, filters],
  );

  return (
    <PlanetsContext.Provider value={ value }>{children}</PlanetsContext.Provider>
  );
}

Planet.propTypes = {}.isRequired;
