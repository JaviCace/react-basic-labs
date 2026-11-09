# TMDB Client

React client for The Movie Database (TMDB). Catalogue pages, search, movie details, cast, recommendations, people and both saved lists all load through React Query.

## Run

```bash
npm install
npm run dev
```

Create a `.env` file in the project root:

```
VITE_TMDB_KEY=your_tmdb_api_key
```

Get a key from [themoviedb.org](https://www.themoviedb.org/settings/api).

## Routes

| Path | TMDB endpoint | What the page does |
| --- | --- | --- |
| `/` | `/discover/movie` | Home catalogue, paginated |
| `/movies/popular` | `/movie/popular` | Popular movies |
| `/movies/top-rated` | `/movie/top_rated` | Top rated movies |
| `/movies/now-playing` | `/movie/now_playing` | Now playing |
| `/movies/upcoming` | `/movie/upcoming` | Upcoming movies |
| `/movies/search` | `/search/movie` | Search the catalogue |
| `/movies/:id` | `/movie/:id`, `/movie/:id/credits`, `/movie/:id/recommendations`, `/movie/:id/reviews` | Details, cast, similar films, reviews |
| `/person/:id` | `/person/:id`, `/person/:id/movie_credits` | Person profile and their films |
| `/movies/favorites` | `/movie/:id` for each saved id | Favourites |
| `/movies/must-watch` | `/movie/:id` for each saved id | Must Watch |

## How the new pieces work

### Static lists

Popular, Top rated, Now playing and Upcoming share one component, `BrowseMovies`. Each page passes a title, a React Query key and a function from `src/api/tmdb-api.jsx`. The page number is part of the query key, so changing page fetches that page from TMDB and caches it. Discover uses the same pattern on the home page.

### Movie, then actor, then that actor’s films

On a movie page, tabs switch between overview, cast and recommendations.

- Cast calls `/movie/:id/credits`. Each person card links to `/person/:id`.
- Recommendations calls `/movie/:id/recommendations`. Each card links to that movie.
- The person page calls `/person/:id` for the biography and `/person/:id/movie_credits` for the films. Tabs split acting credits and crew. Each film links back to `/movies/:id`, so the chain can continue.

### React Query

`QueryClientProvider` wraps the app in `src/main.jsx`. Every TMDB call uses `useQuery` (or `useQueries` when several movies are loaded by id). Upcoming uses the same `BrowseMovies` query as the other lists. Favourites and Must Watch keep only ids in state; each id is loaded with `useQueries` and `getMovie`.

Cached data stays fresh for six minutes (`staleTime` and `refetchInterval`). The window does not refetch on focus.

### Favourites and Must Watch

Both lists live in `MoviesContext`. Adding a film stores its id. The ids are written to `localStorage` (`tmdb-favorites` and `tmdb-must-watch`), so they survive a reload. The header badges show how many films are in each list.

On the Must Watch page, an empty list shows a message and a link to Upcoming. Each card can remove the film from Must Watch or add it to Favourites. Favourites works the same way, with remove and write-review actions.

### Filters, sort and search

The filter card sits beside every catalogue list, including search results, Favourites and Must Watch. It filters the movies already on screen:

- title text
- genre (genres come from `/genre/movie/list`)
- release year, applied when four digits are entered
- minimum rating, from a slider (0–10)

Sort reorders that same set: listed order, title, rating, release date or popularity. It does not ask TMDB for a new ranking.

Search is different. The form on `/movies/search` needs at least two characters, then calls `/search/movie`. Results are paginated. The filter card can still narrow the current page of results.

### Pagination and layout

`MoviePagination` uses the MUI `Pagination` component. TMDB pages are capped at 500. The list header also has previous and next arrows and shows “Page x of y” plus how many films remain after filtering. Changing page scrolls back to the top.

Other MUI pieces used for the extra work: `AppBar` with a Movies menu, `Badge` counts, `Tabs` on the movie and person pages, `Breadcrumbs`, `Chip`, `Drawer` for reviews, `Alert` for empty and error states, `Card` / `CardActionArea` for cast, and `Slider` for the rating filter. The app theme is in `src/theme.js`.

## Video (2–3 minutes, voice)

Record with voice, then put the link in the submission. Suggested order:

1. Open Popular, Top rated and Now playing, and change page.
2. Open a movie, then Cast, then an actor, then one of that actor’s films.
3. Add a film to Must Watch, open that page, and show Favourites.
4. Search for a title, then filter by genre, year and rating, and change the sort.

If the GitHub repository is private, add `rbirney` and `dohalloran74` as collaborators.
