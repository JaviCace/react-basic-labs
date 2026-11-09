import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

const sortOptions = [
  { id: "listed", label: "Listed order" },
  { id: "title", label: "Title (A–Z)" },
  { id: "rating", label: "Rating" },
  { id: "date", label: "Release date" },
  { id: "popularity", label: "Popularity" },
];

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = [{ id: "0", name: "All" }, ...(data.genres || [])];

  const handleChange = (event, type, value) => {
    event.preventDefault();
    props.onUserInput(type, value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={(event) => handleChange(event, "name", event.target.value)}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={(event) => handleChange(event, "genre", event.target.value)}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={String(genre.id)}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sort}
            onChange={(event) => handleChange(event, "sort", event.target.value)}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ ...formControl }}
          id="year-filter"
          label="Release year"
          type="number"
          variant="filled"
          value={props.year}
          placeholder="2024"
          onChange={(event) => handleChange(event, "year", event.target.value)}
        />
        <Box sx={{ px: 2, pt: 2 }}>
          <Typography id="rating-slider" gutterBottom>
            Minimum rating: {props.minRating}
          </Typography>
          <Slider
            aria-labelledby="rating-slider"
            value={Number(props.minRating)}
            min={0}
            max={10}
            step={0.5}
            valueLabelDisplay="auto"
            onChange={(_event, value) => props.onUserInput("rating", value)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
