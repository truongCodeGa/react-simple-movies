import { useEffect, useState } from "react";

export default function useDebounce(initiallizeValue = "", delay = 1000) {
  //
  const [debouneValue, setDebounceValue] = useState(initiallizeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initiallizeValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initiallizeValue]);
  return debouneValue;
}
