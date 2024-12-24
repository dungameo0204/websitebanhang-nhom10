import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value, delay]);

  return valueDebounce;
};