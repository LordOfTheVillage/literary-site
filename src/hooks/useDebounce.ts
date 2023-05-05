import { useState } from "react";

export const useDebounce = (func: any, delay: number = 1000) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  return (...args: any) => {
    clearTimeout(timeoutId);
    const id = setTimeout(() => {
      func(...args);
    }, delay);
    setTimeoutId(id);
  };
};
