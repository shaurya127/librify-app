import { useState, useEffect } from 'react';
import { api, ApiError } from '@/services/api';

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = { immediate: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.get<T>(endpoint);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [endpoint, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export function usePosts() {
  return useApi<Array<{ id: number; title: string; body: string }>>('/posts');
}
