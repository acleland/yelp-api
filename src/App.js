import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // TODO -- add state for zip / search and add event listeners to the inputs
  const [zipCode, setZipCode] = useState('97202');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data.data.businesses);
      setLoading(false);
    };
    fetchData();
  }, []);

  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search

  const handleClick = async () => {
    setLoading(true);
    try {
      if (zipCode) {
        const data = await fetchBusinesses(zipCode, searchQuery);
        setBusinesses(data.data.businesses);
        setLoading(false);
        setError('');
      } else {
        setError('You must enter a zip code');
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      {error && <p>{error}</p>}
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            type="text"
            placeholder="zip"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
