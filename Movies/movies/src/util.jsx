import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {
    length: 400,
    separator: /,?\.* +/,
  });
}

export function withGenreIds(movie) {
  return {
    ...movie,
    genre_ids: movie.genre_ids || (movie.genres || []).map((genre) => genre.id),
  };
}

export function sortMovies(movies, sort) {
  const copy = [...movies];
  if (sort === "title") {
    return copy.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }
  if (sort === "rating") {
    return copy.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  if (sort === "date") {
    return copy.sort((a, b) =>
      (b.release_date || "").localeCompare(a.release_date || "")
    );
  }
  if (sort === "popularity") {
    return copy.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  return copy;
}
