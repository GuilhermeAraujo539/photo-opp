import { useState, useEffect } from "react";

export function useCountdown(start) {
  const [count, setCount] = useState(null);

  const startCountdown = () => setCount(start);

  useEffect(() => {
    if (count === null) return;

    if (count === 0) {
      setCount(null);
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return [count, startCountdown];
}
