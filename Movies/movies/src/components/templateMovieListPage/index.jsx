import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import MoviePagination from "../moviePagination";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { sortMovies } from "../../util";

function MovieListPageTemplate({
  movies,
  title,
  action,
  page,
  totalPages,
  onPageChange,
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sort, setSort] = useState("listed");
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState(0);

  const genreId = Number(genreFilter);

  const filteredMovies = movies
    .filter((movie) =>
      (movie.title || "").toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((movie) =>
      genreId > 0 ? (movie.genre_ids || []).includes(genreId) : true
    )
    .filter((movie) =>
      year.length === 4 ? (movie.release_date || "").startsWith(year) : true
    )
    .filter((movie) => (movie.vote_average || 0) >= Number(minRating));

  const displayedMovies = sortMovies(filteredMovies, sort);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    if (type === "genre") setGenreFilter(value);
    if (type === "sort") setSort(value);
    if (type === "year") setYear(value);
    if (type === "rating") setMinRating(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header
          title={title}
          subtitle={
            page
              ? `Page ${page} of ${Math.min(totalPages || 1, 500)} · ${displayedMovies.length} shown`
              : `${displayedMovies.length} shown`
          }
          page={page}
          totalPages={Math.min(totalPages || 1, 500)}
          onPageChange={onPageChange}
        />
      </Grid>

      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sort={sort}
            year={year}
            minRating={minRating}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 8, lg: 9, xl: 10 }} sx={{ padding: "10px" }}>
          {displayedMovies.length === 0 ? (
            <Alert severity="info">No movies match these filters.</Alert>
          ) : (
            <MovieList action={action} movies={displayedMovies} />
          )}
          <MoviePagination page={page} count={totalPages} onChange={onPageChange} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
