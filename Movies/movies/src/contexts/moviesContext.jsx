import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const readIds = (key) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id) => typeof id === "number");
  } catch {
    return [];
  }
};

const readReviews = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("tmdb-reviews") || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState(() => readIds("tmdb-favorites"));
  const [myReviews, setMyReviews] = useState(readReviews);
  const [mustWatch, setMustWatch] = useState(() => readIds("tmdb-must-watch"));

  const addToFavorites = (movie) => {
    setFavorites((current) =>
      current.includes(movie.id) ? current : [...current, movie.id]
    );
  };

  const removeFromFavorites = (movie) => {
    setFavorites((current) => current.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews((current) => ({ ...current, [movie.id]: review }));
  };

  const addToMustWatch = (movie) => {
    setMustWatch((current) =>
      current.includes(movie.id) ? current : [...current, movie.id]
    );
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((current) => current.filter((mId) => mId !== movie.id));
  };

  useEffect(() => {
    localStorage.setItem("tmdb-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("tmdb-must-watch", JSON.stringify(mustWatch));
  }, [mustWatch]);

  useEffect(() => {
    localStorage.setItem("tmdb-reviews", JSON.stringify(myReviews));
  }, [myReviews]);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
