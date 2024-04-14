import useEarthquakes from "./hooks/useEarthquakes";

const EarthquakesScreen = () => {
  const { earthquakes, loading } = useEarthquakes();


  return (
    <div>
      <h1>Earthquakes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {earthquakes.map((earthquake) => (
            <li key={earthquake.id}>
              {earthquake.attributes.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EarthquakesScreen;
