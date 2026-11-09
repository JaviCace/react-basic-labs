import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { withGenreIds } from "../util";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const movieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    })),
  });

  if (movieIds.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="info"
          action={
            <Button color="inherit" component={Link} to="/movies/upcoming">
              Browse upcoming
            </Button>
          }
        >
          Your Must Watch list is empty. Add a movie from any catalogue page.
        </Alert>
      </Box>
    );
  }

  const isPending = movieQueries.some((query) => query.isPending);
  if (isPending) {
    return <Spinner />;
  }

  const failed = movieQueries.find((query) => query.isError);
  if (failed) {
    return <Alert severity="error">{failed.error.message}</Alert>;
  }

  const movies = movieQueries.map((query) => withGenreIds(query.data));

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromMustWatch movie={movie} />
          <AddToFavoritesIcon movie={movie} />
        </>
      )}
    />
  );
};

export default MustWatchPage;
