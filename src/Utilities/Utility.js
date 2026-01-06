import { Box, Chip, CircularProgress, Typography } from "@mui/material";

export const columns = [
  { id: "id", label: "ID", minWidth: 50, align: "left", mobile: false },
  {
    id: "image",
    label: "Image",
    minWidth: 80,
    align: "center",
    mobile: true,
    format: (value) => (
      <img
        src={value}
        alt="Product"
        style={{
          width: "50px",
          height: "50px",
          objectFit: "contain",
          borderRadius: "4px",
        }}
      />
    ),
  },
  {
    id: "title",
    label: "Title",
    minWidth: 150,
    align: "left",
    mobile: true,
    format: (value) => (
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          maxWidth: "200px",
        }}
      >
        {value}
      </Typography>
    ),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "left",
    mobile: false,
    format: (value) => (
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          maxWidth: "300px",
        }}
      >
        {value}
      </Typography>
    ),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "right",
    mobile: true,
    format: (value) => (
      <Chip
        label={`₹${value.toFixed(2)}`}
        color="primary"
        size="small"
        sx={{ fontWeight: 600 }}
      />
    ),
  },
  {
    id: "category",
    label: "Category",
    minWidth: 120,
    align: "right",
    mobile: false,
    format: (value) => (
      <Chip
        label={value.charAt(0).toUpperCase() + value.slice(1)}
        variant="outlined"
        size="small"
        sx={{ textTransform: "capitalize" }}
      />
    ),
  },
];
export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        marginTop: "64px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export const ErrorDisplay = ({ errors }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        marginTop: "64px",
        color: "error.main",
        p: 3,
      }}
    >
      <Typography variant="h6" align="center">
        Error: {errors.message || "Failed to load products"}
      </Typography>
    </Box>
  );
};
