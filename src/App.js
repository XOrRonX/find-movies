import React , { useEffect , useState }from 'react';

import Movie from './components/Movie'

const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4e5a1b60ac6d4e7df9f67beb07c6dfc2&page=1";

const SEARCH = "https://api.themoviedb.org/3/search/movie?&api_key=4e5a1b60ac6d4e7df9f67beb07c6dfc2&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(API);
  },[]);

  const getMovies = (api) => {
    fetch(api)
    .then(res => res.json())
    .then(data => {
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH + searchTerm);
      setSearchTerm('');
    }
    
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return ( <>
        <header >
          <form onSubmit={handleOnSubmit}>
            <input className="search" type="search" placeholder="Search Movie..." vlaue={searchTerm} onChange={handleOnChange}/>
            <button onClick={handleOnSubmit} className="button" type="button" >Search</button>
          </form>
        </header>
      
        <div className="movie-container">

              {movies.length > 0 && movies.map(movie => 
                  <Movie key={movie.id} {...movie} />
            )}
        </div>
  </>);
}

export default App;
