import React, { useContext, useReducer } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterForm() {
  const { setFilterByName, filterByName,
    setFilters, filters, filtersOptions, setFilterOptions } = useContext(PlanetsContext);
  const columnsOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      columnFilter: filtersOptions[0],
      comparisonFilter: 'maior que',
      valueFilter: 0,
      columnSort: 'population',
      sort: '',
    },
  );

  function handleChange({ target: { name, value } }) {
    setInputValues({ [name]: value });
  }

  function handleClick() {
    const filterObj = {
      column: inputValues.columnFilter,
      comparison: inputValues.comparisonFilter,
      value: inputValues.valueFilter,
    };
    const filter = {
      filterByNumericValues: [...filters.filterByNumericValues, filterObj],
      filterBySort: {},
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
      filterBySort: {},
    };
    setFilters(filter2);
    setFilterOptions([...filtersOptions, name]);
  }

  function submitSort() {
    const filterObj = {
      order: {
        column: inputValues.columnSort,
        sort: inputValues.sort,
      },
    };
    const filter = {
      filterByNumericValues: [...filters.filterByNumericValues],
      filterBySort: filterObj,
    };
    setFilters(filter);
  }

  function clearFilters() {
    const filter = {
      filterByNumericValues: [],
      filterBySort: {},
    };
    setFilters(filter);
    setFilterOptions(columnsOptions);
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
          name="columnFilter"
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
          name="comparisonFilter"
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
          name="valueFilter"
          id="value-filter"
          value={ inputValues.valueFilter }
        />
        <button data-testid="button-filter" type="button" onClick={ handleClick }>
          Filtrar
        </button>
        <select
          data-testid="column-sort"
          name="columnSort"
          id="column-sort"
          onChange={ handleChange }
          value={ inputValues.columnSort }
        >
          {columnsOptions.map((el, index) => (
            <option key={ el + index }>
              {el}
            </option>
          ))}
        </select>
        <label htmlFor="ASC">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            onChange={ handleChange }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            onChange={ handleChange }
          />
          Descendente
        </label>

        <button
          type="button"
          onClick={ submitSort }
          data-testid="column-sort-button"
        >
          Ordenar
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
