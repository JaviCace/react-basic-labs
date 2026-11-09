import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Tooltip from "@mui/material/Tooltip";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleRemove = (event) => {
    event.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <Tooltip title="Remove from Must Watch">
      <IconButton aria-label="remove from must watch" onClick={handleRemove}>
        <PlaylistRemoveIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFromMustWatchIcon;
