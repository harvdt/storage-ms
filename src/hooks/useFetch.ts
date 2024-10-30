/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type FetchMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type State = {
  data: any;
  loading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: Error };

const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, data: action.payload, loading: false };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error();
  }
};

const useFetch = <T>(
  url: string,
  method: FetchMethods = 'GET',
  body?: any,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} => {
  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    data: null,
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      dispatch({ type: 'LOADING' });

      try {
        const options: {
          method: FetchMethods;
          headers: Record<string, string>;
          body?: string;
        } = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (method !== 'GET' && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!didCancel) {
          const data = await response.json();
          dispatch({ type: 'SUCCESS', payload: data });
        }
      } catch (error) {
        if (!didCancel) {
          const errorObject =
            error instanceof Error ? error : new Error(String(error));
          dispatch({ type: 'ERROR', payload: errorObject });
        }
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, body, method]);

  return { ...state };
};

export default useFetch;
