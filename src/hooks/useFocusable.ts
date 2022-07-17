import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation';

export const useFocusable = (id: string) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      Navigation.addElement({ id, node: ref.current, setFocused });
    }

    return () => Navigation.removeElement(id);
  }, [id]);

  return { focused, ref };
};
