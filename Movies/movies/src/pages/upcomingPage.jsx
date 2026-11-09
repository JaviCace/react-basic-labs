import { getUpcomingMovies } from "../api/tmdb-api";
import BrowseMovies from "../components/browseMovies";

const UpcomingPage = () => {
  return (
    <BrowseMovies title="Upcoming Movies" queryKey="upcoming" queryFn={getUpcomingMovies} />
  );
};

export default UpcomingPage;
