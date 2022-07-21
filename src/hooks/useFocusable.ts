import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation';

export const useFocusable = (id: string, onEnter: () => void) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      Navigation.addElement({ id, node: ref.current, setFocused, onEnter });
    }

    return () => Navigation.removeElement(id);
  }, [onEnter, id]);

  return { focused, ref };
};
