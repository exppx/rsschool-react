import { useEffect, useState } from 'react';

type useQueryProps<T> = {
  queryFn: (signal: AbortSignal) => Promise<T>;
  initialData: T;
};

export function useQuery<T>({ queryFn, initialData }: useQueryProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await queryFn(signal);

        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;

        setIsError(true);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [queryFn]);

  return { isLoading, isError, data };
}
