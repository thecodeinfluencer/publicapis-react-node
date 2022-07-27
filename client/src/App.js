import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState([]);
  const [entries, setEntries] = useState([]);
  const [count, setCount] = useState('');
  const [resultCount, setResultCount] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/entries`)
      .then(res => res.json())
      .then(response => {
        setCount(response?.count);
      })
      .catch(err => console.log(err));
  }, []);

  const searchEntry = q => {
    fetch(`http://localhost:5000/api/entries?q=${q}`)
      .then(res => res.json())
      .then(response => {
        setResultCount(response?.count);
        setEntries(response?.entries);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {!!count && <div className='count'>Total Entries: {count}</div>}
        {!!resultCount && (
          <div className='count'>Items found: {resultCount}</div>
        )}
        <div className='search'>
          <input
            type='text'
            name='search'
            placeholder='Type to search'
            value={query}
            onChange={e => setQuery(e.target.value)}
            required
          />
          <button onClick={() => searchEntry(query)}>Search</button>
        </div>

        {entries?.map(entry => (
          <div key={entry?.API} className='entry'>
            <div className='title'>
              <div className='API'>{entry?.API}</div>
              <div className='category'>
                <p>{entry?.Category}</p>
              </div>
            </div>
            <div className='description'>{entry?.Description}</div>
            <button onClick={() => window.open(entry.Link, '_blank')}>
              Explore &rarr;
            </button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
