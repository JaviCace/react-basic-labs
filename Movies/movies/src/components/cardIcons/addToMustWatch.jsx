import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Tooltip from "@mui/material/Tooltip";

const AddToMustWatchIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);
  const saved = mustWatch.includes(movie.id);

  const handleAdd = (event) => {
    event.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <Tooltip title={saved ? "Already on Must Watch" : "Add to Must Watch"}>
      <span>
        <IconButton
          aria-label="add to must watch"
          onClick={handleAdd}
          disabled={saved}
        >
          {saved ? (
            <PlaylistAddCheckIcon color="primary" fontSize="large" />
          ) : (
            <PlaylistAddIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AddToMustWatchIcon;
