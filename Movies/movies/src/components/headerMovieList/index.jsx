import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = ({ title, subtitle, page = 1, totalPages = 1, onPageChange }) => {
  const navigate = useNavigate();
  const paging = typeof onPageChange === "function";

  const goBack = () => {
    if (paging && page > 1) {
      onPageChange(page - 1);
      return;
    }
    navigate(-1);
  };

  const goForward = () => {
    if (paging && page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
        padding: 1,
      }}
    >
      <IconButton aria-label="go back" onClick={goBack} disabled={paging && page <= 1}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" align="center">
        {title}
        {subtitle ? (
          <Typography variant="subtitle1" component="div" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Typography>
      <IconButton
        aria-label="go forward"
        onClick={goForward}
        disabled={!paging || page >= totalPages}
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
