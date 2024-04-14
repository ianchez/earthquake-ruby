import { useEffect, useState } from 'react';

const EarthquakesScreen = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/features');
      const { data } = await response.json();
      setEarthquakes(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);


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
