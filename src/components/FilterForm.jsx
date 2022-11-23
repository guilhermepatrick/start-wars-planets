import React, { useContext, useReducer } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterForm() {
  const { setFilterByName, filterByName,
    setFilters, filters, filtersOptions, setFilterOptions } = useContext(PlanetsContext);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      columnFilter: filtersOptions[0],
      comparisonFilter: 'maior que',
      valueFilter: 0,
    },
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
    const availableOptions = filtersOptions
      .filter((el) => el !== inputValues.columnFilter);

    setFilters(filter);
    setFilterOptions(availableOptions);
    setInputValues({ columnFilter: filtersOptions[0] });
  }

  function handleDelete({ target: { id, name } }) {
    const actualFilters = filters.filterByNumericValues;
    const newFilters = actualFilters.filter((_el, index) => +index !== +id);
    const filter2 = {
      filterByNumericValues: newFilters,
    };
    setFilters(filter2);
    setFilterOptions([...filtersOptions, name]);
  }

  function clearFilters() {
    const filter = {
      filterByNumericValues: [],
    };
    setFilters(filter);
    setFilterOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
      '',
    ]);
  }

  function renderFilters() {
    return (
      <ul>
        {filters.filterByNumericValues?.map((el, index) => (
          <li data-testid="filter" key={ el + index }>
            {el.column}
            {el.comparison}
            {el.value}
            <button
              id={ index }
              name={ el.column }
              type="button"
              onClick={ handleDelete }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    );
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
          value={ inputValues.columnFilter }
        >
          {filtersOptions.map((el, index) => (
            <option key={ el + index } value={ el }>
              {el}
            </option>
          ))}
        </select>
        <select
          value={ inputValues.comparisonFilter }
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
        <button data-testid="button-filter" type="button" onClick={ handleClick }>
          Filtrar
        </button>
        <button
          type="button"
          onClick={ clearFilters }
          data-testid="button-remove-filters"
        >
          Remover Filtragens
        </button>
      </section>
      {renderFilters()}
    </div>
  );
}

export default FilterForm;
