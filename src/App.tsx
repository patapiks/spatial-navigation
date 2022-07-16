import { useEffect } from 'react';

import { useFocusable } from './hooks/useFocusable';
import Navigation from './Navigation';

import './App.css';

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ListItem = ({ value }: { value: number }) => {
  const { ref, focused } = useFocusable(String(value));

  return (
    <li ref={ref} className={focused ? 'list__item list__item_focused' : 'list__item'}>
      {value}
    </li>
  );
};

function App() {
  useEffect(() => {
    Navigation.start('1');

    return () => {
      Navigation.stop();
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <ul className="list">
          {mock.map((item) => (
            <ListItem key={item} value={item} />
          ))}
        </ul>
      </header>
      <main className="main">
        <div>
          <ul className="list">
            {mock.map((item) => (
              <ListItem key={item + 100} value={item + 100} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
