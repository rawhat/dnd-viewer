import { useCallback } from 'react';
import { useState } from "react";

type DebounceHook<T> = [T | undefined, (value: T) => void, T | undefined];

export function useDebounce<T>(delay: number, initialValue?: T): DebounceHook<T> {
  const [actualValue, setActualValue] = useState<T | undefined>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const onChange = useCallback((value: T) => {
    setActualValue(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)
    setTimeoutId(id);
  }, [delay, timeoutId])

  return [debouncedValue, onChange, actualValue];
}
