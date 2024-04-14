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
  const [totalPages, setTotalPages] = useState(0);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchEarthquakes = async (magType, page, perPage) => {
    setLoading(true);
    const { data, pagination } = await ApiService.fetchEarthquakes(magType, page, perPage);
    console.log({ data, pagination })
    setEarthquakes(data || []);
    setTotalPages(pagination.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes(magType, page, perPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magType, page, perPage, fetchTrigger]);

  const refetch = () => setFetchTrigger(prev => prev + 1); // Function to trigger a refetch

  return { earthquakes, totalPages, loading, refetch };
}

export default useEarthquakes;