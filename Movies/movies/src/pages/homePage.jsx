import { getMovies } from "../api/tmdb-api";
import BrowseMovies from "../components/browseMovies";

const HomePage = () => {
  return <BrowseMovies title="Discover Movies" queryKey="discover" queryFn={getMovies} />;
};

export default HomePage;
