const handleResponse = (response) => {
  if (!response.ok) {
    return response.json().then((error) => {
      throw new Error(error.status_message || "Something went wrong");
    });
  }
  return response.json();
};

const fetchJson = (path) => {
  const joiner = path.includes("?") ? "&" : "?";
  return fetch(
    `https://api.themoviedb.org/3${path}${joiner}api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then(handleResponse)
    .catch((error) => {
      throw error;
    });
};

const queryParams = (args) => {
  if (args && typeof args === "object" && args.queryKey) {
    return args.queryKey[1] || {};
  }
  return {};
};

const idFrom = (args) => {
  if (args && typeof args === "object" && args.queryKey) {
    return args.queryKey[1].id;
  }
  return args;
};

const pageFrom = (args) => {
  const params = queryParams(args);
  if (params.page) {
    return params.page;
  }
  return typeof args === "number" ? args : 1;
};

export const getMovies = (args) => {
  const page = pageFrom(args);
  return fetchJson(
    `/discover/movie?language=en-US&include_adult=false&include_video=false&page=${page}`
  );
};

export const getPopularMovies = (args) => {
  return fetchJson(
    `/movie/popular?language=en-US&page=${pageFrom(args)}`
  );
};

export const getTopRatedMovies = (args) => {
  return fetchJson(
    `/movie/top_rated?language=en-US&page=${pageFrom(args)}`
  );
};

export const getNowPlayingMovies = (args) => {
  return fetchJson(
    `/movie/now_playing?language=en-US&page=${pageFrom(args)}`
  );
};

export const getUpcomingMovies = (args) => {
  return fetchJson(
    `/movie/upcoming?language=en-US&page=${pageFrom(args)}`
  );
};

export const searchMovies = (args) => {
  const { query = "", page = 1 } = queryParams(args);
  return fetchJson(
    `/search/movie?language=en-US&query=${encodeURIComponent(query)}&include_adult=false&page=${page}`
  );
};

export const getMovie = (args) => {
  const id = idFrom(args);
  return fetchJson(`/movie/${id}?language=en-US`);
};

export const getGenres = () => {
  return fetchJson("/genre/movie/list?language=en-US");
};

export const getMovieImages = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/movie/${id}/images`);
};

export const getMovieReviews = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/movie/${id}/reviews?language=en-US`);
};

export const getMovieRecommendations = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/movie/${id}/recommendations?language=en-US&page=1`);
};

export const getMovieCredits = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/movie/${id}/credits?language=en-US`);
};

export const getPerson = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/person/${id}?language=en-US`);
};

export const getPersonMovieCredits = ({ queryKey }) => {
  const { id } = queryKey[1];
  return fetchJson(`/person/${id}/movie_credits?language=en-US`);
};
