import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

export const DEFAULT_VALUES = {
  magType: [ 'md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg' ],
  page: 1,
  perPage: 10
};

const useEarthquakes = ({
  magType = DEFAULT_VALUES.magType,
  page = DEFAULT_VALUES.page,
  perPage = DEFAULT_VALUES.perPage
}) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakes = async (magType, page, perPage) => {
    setLoading(true);
    const data = await ApiService.fetchEarthquakes(magType, page, perPage);
    setEarthquakes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes(magType, page, perPage);
  }, [magType, page, perPage]);

  return { earthquakes, loading };
}

export default useEarthquakes;