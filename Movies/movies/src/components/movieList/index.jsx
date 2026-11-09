
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  return (
    <Grid container spacing={2}>
      {props.movies.map((m) => (
        <Grid
          key={m.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "10px" }}
        >
                  <Movie key={m.id} movie={m} action={props.action} />


        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
