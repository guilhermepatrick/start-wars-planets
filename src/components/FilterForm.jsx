import React, { useContext, useReducer } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterForm() {
  const { setFilterByName, filterByName,
    setFilters, filters } = useContext(PlanetsContext);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { columnFilter: 'population', comparisonFilter: 'maior que', valueFilter: 0 },
  );

  function handleChange({ target: { name, value } }) {
    if (name === 'column-filter') {
      setInputValues({ columnFilter: value });
    }
    if (name === 'comparison-filter') {
      setInputValues({ comparisonFilter: value });
    }
    if (name === 'value-filter') {
      setInputValues({ valueFilter: value });
    }
  }

  function handleClick() {
    const filterObj = {
      column: inputValues.columnFilter,
      comparison: inputValues.comparisonFilter,
      value: inputValues.valueFilter,
    };
    const filter = {
      filterByNumericValues: [...filters.filterByNumericValues, filterObj],
    };
    setFilters(filter);
  }

  function handleDelete({ target: { id } }) {
    const actualFilters = filters.filterByNumericValues;
    const newFilters = actualFilters.filter((_el, index) => +index !== +id);
    const filter2 = {
      filterByNumericValues: [newFilters],
    };
    setFilters(filter2);
  }

  return (
    <div>
      <section>
        <input
          type="text"
          data-testid="name-filter"
          name="name-filter"
          id="name-filter"
          value={ filterByName }
          onChange={ ({ target: { value } }) => setFilterByName(value) }
          placeholder="Nome de um Planeta"
        />
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="comparison-filter"
          id="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          onChange={ handleChange }
          type="number"
          data-testid="value-filter"
          name="value-filter"
          id="value-filter"
          value={ inputValues.valueFilter }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </section>
      <ul>
        {filters.filterByNumericValues?.map((el, index) => (
          <li key={ el + index }>
            {el.column}
            {el.comparison}
            {el.value}
            <button
              id={ index }
              type="button"
              onClick={ handleDelete }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterForm;
