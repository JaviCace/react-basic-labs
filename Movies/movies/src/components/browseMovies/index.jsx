import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import PageTemplate from "../templateMovieListPage";
import Spinner from "../spinner";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";

const BrowseMovies = ({ title, queryKey, queryFn }) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryKey, { page }],
    queryFn,
  });

  const changePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <PageTemplate
      title={title}
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
  );
};

export default BrowseMovies;
