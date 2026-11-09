import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const MoviePagination = ({ page, count, onChange }) => {
  if (!count || count <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
      <Pagination
        color="primary"
        shape="rounded"
        page={page}
        count={Math.min(count, 500)}
        onChange={(_event, value) => onChange(value)}
      />
    </Box>
  );
};

export default MoviePagination;
