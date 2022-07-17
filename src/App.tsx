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
    <div className="App">
      <header className="header">
        <ul className="list">
          {mockedArray.map((item) => (
            <ListItem key={item} id={item} />
          ))}
        </ul>
      </header>
      <main className="main">
        <div>
          <ul className="list">
            {mockedArray.map((item) => (
              <ListItem key={item + 100} id={item + 100} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
