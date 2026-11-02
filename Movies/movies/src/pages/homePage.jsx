
import { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import Header from "../components/headerMovieList";
import FilterCard from "../components/filterMoviesCard";

const genres = [
  { id: "0", name: "All" }
];

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [genresList, setGenres] = useState(genres);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY
    )
      .then(res => res.json())
      .then(json => {
        setGenres([genres[0], ...json.genres]);
      });
  }, []);

  const handleChange = (e, type, value) => {
    e.preventDefault();

    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    }
  };

  const handleTextChange = e => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = e => {
    handleChange(e, "genre", e.target.value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => {
        setMovies(json.results);
      });
  }, []);

  const displayedMovies = movies.filter(movie => {
    const matchesName = movie.title
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const matchesGenre =
      genreFilter === "0" ||
      movie.genre_ids.includes(Number(genreFilter));

    return matchesName && matchesGenre;
  });

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Home Page" />
      </Grid>

      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            genres={genresList}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 8, lg: 9, xl: 10 }}>
          <MovieList movies={displayedMovies} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
