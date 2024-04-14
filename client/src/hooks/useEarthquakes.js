import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const useEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakes = async () => {
    setLoading(true);
    const data = await ApiService.fetchEarthquakes();
    setEarthquakes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  return { earthquakes, loading };
}

export default useEarthquakes;