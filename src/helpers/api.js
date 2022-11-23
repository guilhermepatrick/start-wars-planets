const getPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const { results } = await response.json();
  results.forEach((el) => {
    delete el.residents;
  });
  return results;
};
export default getPlanets;
