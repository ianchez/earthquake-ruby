import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DEFAULT_PAGINATION = {
  page: 1,
  perPage: 10
};

const useEarthquakes = ({
  page = DEFAULT_PAGINATION.page,
  perPage = DEFAULT_PAGINATION.perPage
}) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEarthquakes = async (page, perPage) => {
    setLoading(true);
    const data = await ApiService.fetchEarthquakes(page, perPage);
    setEarthquakes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes(page, perPage);
  }, [page, perPage]);

  return { earthquakes, loading };
}

export default useEarthquakes;