import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";

const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const movies = data.results || [];

  if (movies.length === 0) {
    return <Alert severity="info">No recommendations for this movie yet.</Alert>;
  }

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Recommendations
      </Typography>
      <MovieList
        movies={movies}
        action={(item) => (
          <>
            <AddToFavoritesIcon movie={item} />
            <AddToMustWatchIcon movie={item} />
          </>
        )}
      />
    </>
  );
};

export default MovieRecommendations;
