import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation';

export const useFocusable = (key: string) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (ref.current) {
      Navigation.addElement({ key, node: ref.current, setFocused });
    }

    return () => Navigation.removeElement(key);
  }, [key]);

  return { focused, ref };
};
