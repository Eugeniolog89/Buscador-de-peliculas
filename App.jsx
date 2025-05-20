import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return '';

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();

      if (data.Response === 'True' || data.Response === 'true') setMovies(data.Search);
      else setError(data.Error);
      
    } catch (err) {
      setError('Error connecting with the server:', err);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Buscador</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Look for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;