const getPlanets = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    console.log(results);
    results.forEach((el) => {
      delete el.residents;
    });
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};
export default getPlanets;
