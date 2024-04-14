import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const useQuakeComments = (quakeId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const fetchComments = async () => {
    setLoading(true);
    const data = await ApiService.fetchCommentsByEarthquakeId(quakeId);
    setComments(data.error ? [] : data);
    setLoading(false);
  };

  const createComment = async (comment) => {
    const response = await ApiService.createComment(quakeId, comment);
    if (response) {
      setRefetchTrigger(prev => prev + 1);
    }
  }

  useEffect(() => {
    fetchComments(quakeId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quakeId, refetchTrigger]);

  return { comments, loading, createComment };
}

export default useQuakeComments;