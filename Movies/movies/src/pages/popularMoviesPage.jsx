import { getPopularMovies } from "../api/tmdb-api";
import BrowseMovies from "../components/browseMovies";

const PopularMoviesPage = () => {
  return (
    <BrowseMovies title="Popular Movies" queryKey="popular" queryFn={getPopularMovies} />
  );
};

export default PopularMoviesPage;
