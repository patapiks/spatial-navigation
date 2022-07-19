import { FC } from 'react';
import classNames from 'classnames';

import { useFocusable } from '../../hooks/useFocusable';

interface IListItem {
  id: string;
  value: string;
}

export const ListItem: FC<IListItem> = ({ id, value }) => {
  const { ref, focused } = useFocusable(id);

  return (
    <li
      ref={ref}
      className={classNames('list__item', 'focusable-element', {
        'focusable-element_focused': focused,
      })}
    >
      {value}
    </li>
  );
};
