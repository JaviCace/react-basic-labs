import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" align="center">
        {movie.title}
        {movie.homepage ? (
          <a href={movie.homepage} target="_blank" rel="noreferrer">
            <HomeIcon color="primary" />
          </a>
        ) : null}
        <Typography variant="h6" component="div" color="text.secondary">
          {movie.tagline ? `"${movie.tagline}"` : ""}
        </Typography>
      </Typography>
      <Box sx={{ width: 48 }} />
    </Paper>
  );
};

export default MovieHeader;
