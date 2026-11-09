import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { withGenreIds } from "../util";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  const favoriteMovieQueries = useQueries({
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
            <Button color="inherit" component={Link} to="/">
              Discover movies
            </Button>
          }
        >
          You have no favourite movies yet.
        </Alert>
      </Box>
    );
  }

  const isPending = favoriteMovieQueries.some((query) => query.isPending);
  if (isPending) {
    return <Spinner />;
  }

  const failed = favoriteMovieQueries.find((query) => query.isError);
  if (failed) {
    return <Alert severity="error">{failed.error.message}</Alert>;
  }

  const movies = favoriteMovieQueries.map((query) => withGenreIds(query.data));

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;
