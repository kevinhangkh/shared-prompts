'use client';

import { useEffect, useRef } from 'react';

type Function = (...args: any[]) => void;

function useDebounce<Func extends Function>(func: Func, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // When unmounting, clear timer if still running
  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      }
      clearTimeout(timer.current);
    };
  }, []);

  const debounce = ((...args: any[]) => {
    const newTimer = setTimeout(() => {
      func(...args); // call the function with the args
    }, delay);

    clearTimeout(timer.current); // Cancel previous timer
    timer.current = newTimer; // Save new timer
  }) as Func;

  return debounce;
}

export default useDebounce;
