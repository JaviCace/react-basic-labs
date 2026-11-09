import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const cast = (data.cast || []).slice(0, 18);

  if (cast.length === 0) {
    return <Alert severity="info">No cast information for this movie.</Alert>;
  }

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((person) => (
          <Grid key={person.credit_id || person.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <Card>
              <CardActionArea component={Link} to={`/person/${person.id}`}>
                <CardMedia
                  sx={{ height: 220 }}
                  image={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                      : img
                  }
                  title={person.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="p">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.character}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCast;
