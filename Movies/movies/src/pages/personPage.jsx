import { useMemo, useState } from "react";
import { useParams, Link as RouterLink } from "react-router";
import Link from "@mui/material/Link";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import img from "../images/film-poster-placeholder.png";

const uniqueMovies = (credits) => {
  const seen = new Set();
  return (credits || [])
    .filter((movie) => movie.title && movie.poster_path)
    .filter((movie) => {
      if (seen.has(movie.id)) {
        return false;
      }
      seen.add(movie.id);
      return true;
    })
    .map((movie) => ({
      ...movie,
      genre_ids: movie.genre_ids || [],
    }))
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
};

const PersonPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  const personQuery = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const creditsQuery = useQuery({
    queryKey: ["person-credits", { id }],
    queryFn: getPersonMovieCredits,
  });

  const castMovies = useMemo(
    () => uniqueMovies(creditsQuery.data?.cast),
    [creditsQuery.data]
  );
  const crewMovies = useMemo(
    () => uniqueMovies(creditsQuery.data?.crew),
    [creditsQuery.data]
  );

  if (personQuery.isPending || creditsQuery.isPending) {
    return <Spinner />;
  }

  if (personQuery.isError) {
    return <Alert severity="error">{personQuery.error.message}</Alert>;
  }

  if (creditsQuery.isError) {
    return <Alert severity="error">{creditsQuery.error.message}</Alert>;
  }

  const person = personQuery.data;
  const movies = tab === 0 ? castMovies : crewMovies;

  return (
    <Box sx={{ p: 2 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Movies
        </Link>
        <Typography color="text.primary">{person.name}</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Box
              component="img"
              alt={person.name}
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w342/${person.profile_path}`
                  : img
              }
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9 }}>
            <Typography variant="h3" component="h1">
              {person.name}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
              {person.known_for_department && (
                <Chip label={person.known_for_department} color="primary" />
              )}
              {person.birthday && <Chip label={`Born ${person.birthday}`} />}
              {person.place_of_birth && <Chip label={person.place_of_birth} />}
              <Chip label={`${castMovies.length} acting credits`} />
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {person.biography || "No biography available."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tab} onChange={(_event, value) => setTab(value)} sx={{ mb: 2 }}>
        <Tab label={`Movies (${castMovies.length})`} />
        <Tab label={`Crew (${crewMovies.length})`} />
      </Tabs>

      {movies.length === 0 ? (
        <Alert severity="info">No movies in this list.</Alert>
      ) : (
        <MovieList
          movies={movies}
          action={(movie) => (
            <>
              <AddToFavoritesIcon movie={movie} />
              <AddToMustWatchIcon movie={movie} />
            </>
          )}
        />
      )}
    </Box>
  );
};

export default PersonPage;
