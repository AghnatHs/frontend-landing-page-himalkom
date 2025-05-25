import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook untuk fetch data dari API
 * @param {string} endpoint - API endpoint (contoh: 'communities')
 * @param {string} baseUrl - Base URL API
 * @returns {Object} - Data, loading state, dan error state
 */
export const useFetchData = (endpoint, baseUrl) => {  
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }));
    
    axios.get(`${baseUrl}/${endpoint}`)
      .then((response) => {
        setState({
          data: response.data,
          loading: false,
          error: null
        });
      })
      .catch((err) => {
        console.error(`Error fetching ${endpoint}:`, err);
        setState({
          data: null,
          loading: false,
          error: err.message
        });
      });
  }, [endpoint, baseUrl]);

  return state;
};