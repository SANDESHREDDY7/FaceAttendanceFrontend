import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
  } from "@mui/material";
  
  import SearchIcon from "@mui/icons-material/Search";
  import FilterListIcon from "@mui/icons-material/FilterList";
  
  function SearchBar() {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by Name, Roll Number..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{
              flex: 1,
              minWidth: 250,
            }}
          />
  
          <TextField
            select
            label="Class"
            defaultValue="All"
            sx={{
              width: 180,
            }}
          >
            <MenuItem value="All">All Classes</MenuItem>
            <MenuItem value="10-A">10-A</MenuItem>
            <MenuItem value="10-B">10-B</MenuItem>
            <MenuItem value="10-C">10-C</MenuItem>
          </TextField>
  
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{
              height: 56,
            }}
          >
            Filter
          </Button>
        </Box>
      </Paper>
    );
  }
  
  export default SearchBar;