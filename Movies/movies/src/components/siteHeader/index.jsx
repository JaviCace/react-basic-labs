import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import { useLocation, useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MoviesContext } from "../../contexts/moviesContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const browseOptions = [
  { label: "Discover", path: "/" },
  { label: "Popular", path: "/movies/popular" },
  { label: "Top Rated", path: "/movies/top-rated" },
  { label: "Now Playing", path: "/movies/now-playing" },
  { label: "Upcoming", path: "/movies/upcoming" },
];

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [browseAnchor, setBrowseAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const browseOpen = Boolean(browseAnchor);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, mustWatch } = useContext(MoviesContext);

  const linkOptions = [
    { label: "Search", path: "/movies/search" },
    { label: "Favorites", path: "/movies/favorites", count: favorites.length },
    { label: "Must Watch", path: "/movies/must-watch", count: mustWatch.length },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setBrowseAnchor(null);
    navigate(pageURL);
  };

  const mobileOptions = [...browseOptions, ...linkOptions];

  const labelFor = (opt) => (
    <Badge badgeContent={opt.count || 0} color="error">
      {opt.label}
    </Badge>
  );

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          {!isMobile && (
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              All you ever wanted to know about movies
            </Typography>
          )}

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {mobileOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    selected={location.pathname === opt.path}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {labelFor(opt)}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                aria-haspopup="true"
                onClick={(event) => setBrowseAnchor(event.currentTarget)}
              >
                Movies
              </Button>
              <Menu
                anchorEl={browseAnchor}
                open={browseOpen}
                onClose={() => setBrowseAnchor(null)}
              >
                {browseOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    selected={location.pathname === opt.path}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
              {linkOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    borderBottom:
                      location.pathname === opt.path
                        ? "2px solid white"
                        : "2px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {labelFor(opt)}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
