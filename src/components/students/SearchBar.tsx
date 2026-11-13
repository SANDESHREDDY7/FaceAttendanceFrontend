import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useColorMode } from "../../theme/ThemeContext";

interface Props {
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  selectedClass?: string;
  onClassChange?: (val: string) => void;
}

function SearchBar({
  searchTerm = "",
  onSearchChange,
  selectedClass = "All",
  onClassChange,
}: Props) {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: "16px",
        background: isDark ? "rgba(19, 26, 42, 0.7)" : "#FFFFFF",
        backdropFilter: isDark ? "blur(16px)" : "none",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark ? "none" : "0 4px 20px rgba(0, 0, 0, 0.04)",
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
          placeholder="Search by student name or roll number..."
          value={searchTerm}
          onChange={(e) => onSearchChange?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: isDark ? "#64748B" : "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 260,
            "& .MuiOutlinedInput-root": {
              height: 48,
            },
          }}
        />

        <FormControl sx={{ width: 170 }}>
          <Select
            value={selectedClass}
            onChange={(e) => onClassChange?.(e.target.value as string)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected || selected === "All") {
                return <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>All Classes</span>;
              }
              return `Class ${selected}`;
            }}
            sx={{
              height: 48,
              borderRadius: "12px",
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "#FFFFFF",
              "& fieldset": {
                borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <MenuItem value="All">All Classes</MenuItem>
            <MenuItem value="10">Class 10</MenuItem>
            <MenuItem value="9">Class 9</MenuItem>
            <MenuItem value="8">Class 8</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            height: 48,
            borderRadius: "12px",
            borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
          }}
        >
          Filters
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchBar;
