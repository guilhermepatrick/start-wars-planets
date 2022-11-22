import React, { useContext } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

export default function Home() {
  const { setFilterByName, filterByName } = useContext(PlanetsContext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="name-filter"
        id="name-filter"
        value={ filterByName }
        onChange={ ({ target: { value } }) => setFilterByName(value) }
        placeholder="Nome de um Planeta"
      />
      <Table />
    </div>
  );
}
