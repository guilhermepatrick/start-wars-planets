import React, { useEffect, useMemo, useState } from 'react';
import getPlanets from '../helpers/api';
import PlanetsContext from './PlanetsContext';

export default function Planet({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then((result) => setPlanets(result));
  }, []);

  const value = useMemo(
    () => ({
      planets,
    }),
    [planets],
  );

  return (
    <PlanetsContext.Provider value={ value }>{children}</PlanetsContext.Provider>
  );
}

Planet.propTypes = {}.isRequired;
