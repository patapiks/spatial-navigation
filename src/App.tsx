import { useEffect } from 'react';

import { ListItem } from './components/listItem';
import Navigation from './Navigation';
import { mockedArray } from './mock';

import './App.css';

function App() {
  useEffect(() => {
    Navigation.init({ initialId: '1' });

    return () => {
      Navigation.destroy();
    };
  }, []);

  return (
    <div className="app">
      <nav>
        <ul className="nav-list">
          {mockedArray.slice(0, 5).map((item) => (
            <ListItem key={item} id={item} value={item} />
          ))}
        </ul>
      </nav>
      <main className="main">
        <ul className="list-one">
          {mockedArray.slice(0, 7).map((item) => (
            <ListItem key={item + 5} id={item + 5} value={item + 5} />
          ))}
        </ul>
        <ul className="list-two">
          {mockedArray.map((item) => (
            <ListItem key={item + 100} id={item + 100} value={item + 100} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
