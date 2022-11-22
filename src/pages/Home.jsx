import React, { useContext } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

export default function Home() {
  const { planets } = useContext(PlanetsContext);
  console.log(planets);

  return (
    <div>
      <Table />
    </div>
  );
}
