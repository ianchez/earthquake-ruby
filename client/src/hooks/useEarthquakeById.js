import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const useEarthquakeById = (id) => {
  const [earthquake, setEarthquake] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakeById = async (id) => {
    setLoading(true);
    const data = await ApiService.fetchEarthquakeById(id);
    setEarthquake(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakeById(id);
  }, [id]);

  return {
    earthquake,
    loading
  };
}

export default useEarthquakeById;
