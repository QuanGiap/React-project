import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import MovieList from "./components/MovieList";
import { nanoid } from "nanoid";
import Header from "./components/MovieListHeading";
import Search from "./components/SearchBox";
function App() {
  const [movies, setMovies] = React.useState([]);
  const [searchValue, setSearch] = React.useState([]);
  const [favorite, setFavorite] = React.useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  function RemoveFavorite(index){
    const data = favorite;
    data.splice(index,1);
    setFavorite([...data]);
    localStorage.setItem('favorite',JSON.stringify(data));
  }
  function AddFavorite(obj){
    const data = favorite;
    for(let i = 0;i<data.length;i++){
        if(data[i].imdbID === obj.imdbID) {
            return;
        }
    }
    data.push(obj);
    setFavorite([...data]);
    localStorage.setItem('favorite',JSON.stringify(data));
  }
  const movieSet = movies
    ? movies.map((movie) => (
        <MovieList key={nanoid()} {...movie} description="Add to favorite ❤" funct={()=>AddFavorite(movie)}/>
      ))
    : [];
  async function getMovieRequest(searchValue) {
    let response = await fetch(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=5451b113`
    );
    let data = await response.json();
    if (data.Response) setMovies(data.Search);
    else {
      console.log("error fetch");
    }
  }
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  const favComponent = favorite.map((movie,index) => 
  <MovieList key={nanoid()} {...movie} description="Remove from favorite 💔" funct={()=>RemoveFavorite(index)}/>);
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Header heading="Movies" />
        <Search value={searchValue} setSeach={setSearch} />
      </div>
      <div className="movie-container">{movieSet}</div>
      <Header heading="Favorite" />
      <div className="movie-container">{favComponent}
      </div>
    </div>
  );
}

export default App;
