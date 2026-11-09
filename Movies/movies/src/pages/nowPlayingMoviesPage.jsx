import { getNowPlayingMovies } from "../api/tmdb-api";
import BrowseMovies from "../components/browseMovies";

const NowPlayingMoviesPage = () => {
  return (
    <BrowseMovies
      title="Now Playing"
      queryKey="now-playing"
      queryFn={getNowPlayingMovies}
    />
  );
};

export default NowPlayingMoviesPage;
