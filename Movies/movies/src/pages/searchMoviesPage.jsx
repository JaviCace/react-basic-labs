import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { searchMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const SearchMoviesPage = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query, page }],
    queryFn: searchMovies,
    enabled: query.trim().length > 1,
  });

  const submit = (event) => {
    event.preventDefault();
    setPage(1);
    setQuery(text.trim());
  };

  const changePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Paper sx={{ p: 2, m: 2 }}>
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
        >
          <TextField
            label="Search TMDB"
            value={text}
            onChange={(event) => setText(event.target.value)}
            sx={{ flex: "1 1 280px" }}
          />
          <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            Search
          </Button>
        </Box>
      </Paper>

      {!query && (
        <Alert severity="info" sx={{ m: 2 }}>
          Type at least two characters and search the movie catalogue.
        </Alert>
      )}

      {query && isPending && <Spinner />}

      {query && isError && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error.message}
        </Alert>
      )}

      {query && data && (
        <PageTemplate
          title={`Results for “${query}”`}
          movies={data.results || []}
          page={page}
          totalPages={data.total_pages}
          onPageChange={changePage}
          action={(movie) => (
            <>
              <AddToFavoritesIcon movie={movie} />
              <AddToMustWatchIcon movie={movie} />
            </>
          )}
        />
      )}
    </>
  );
};

export default SearchMoviesPage;
