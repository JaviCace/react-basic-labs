import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieCast from "../movieCast";
import MovieRecommendations from "../movieRecommendations";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_event, value) => setTab(value)}
        sx={{ mb: 2 }}
        variant="scrollable"
      >
        <Tab label="Details" />
        <Tab label="Cast" />
        <Tab label="Recommendations" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Typography variant="h5" component="h3">
            Overview
          </Typography>

          <Typography variant="h6" component="p">
            {movie.overview}
          </Typography>

          <Paper component="ul" sx={{ ...root }}>
            <li>
              <Chip label="Genres" sx={{ ...chip }} color="primary" />
            </li>
            {(movie.genres || []).map((genre) => (
              <li key={genre.id}>
                <Chip label={genre.name} sx={{ ...chip }} />
              </li>
            ))}
          </Paper>

          <Paper component="ul" sx={{ ...root }}>
            <li>
              <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
            </li>
            {(movie.production_countries || []).map((country) => (
              <li key={country.iso_3166_1}>
                <Chip label={country.name} sx={{ ...chip }} />
              </li>
            ))}
          </Paper>

          <Paper component="ul" sx={{ ...root }}>
            <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
            <Chip
              icon={<MonetizationIcon />}
              label={(movie.revenue || 0).toLocaleString()}
            />
            <Chip
              icon={<StarRate />}
              label={`${movie.vote_average} (${movie.vote_count})`}
            />
            <Chip label={`Released: ${movie.release_date}`} />
          </Paper>
        </Box>
      )}

      {tab === 1 && <MovieCast movie={movie} />}
      {tab === 2 && <MovieRecommendations movie={movie} />}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
