import { getTopRatedMovies } from "../api/tmdb-api";
import BrowseMovies from "../components/browseMovies";

const TopRatedMoviesPage = () => {
  return (
    <BrowseMovies
      title="Top Rated Movies"
      queryKey="top-rated"
      queryFn={getTopRatedMovies}
    />
  );
};

export default TopRatedMoviesPage;
