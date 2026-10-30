import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import RecommendIcon from "@mui/icons-material/Recommend";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function Navbar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        background: "#ffffff",
        color: "#1e293b",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 1,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          <Avatar
            sx={{
              bgcolor: "#2563eb",
              width: 42,
              height: 42,
            }}
          >
            <FitnessCenterIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Fitness Tracker
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Track • Improve • Achieve
            </Typography>
          </Box>
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>

          <Button
            startIcon={<HistoryIcon />}
            onClick={() => navigate("/activities")}
          >
            Activities
          </Button>

          <Button
            startIcon={<RecommendIcon />}
            onClick={() => navigate("/recommendations")}
          >
            Recommendations
          </Button>

          <Button
            startIcon={<PersonIcon />}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        </Box>

        {/* User */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* <Chip
            avatar={<Avatar>{userName?.charAt(0)?.toUpperCase()}</Avatar>}
            label={userName}
            color="primary"
            variant="outlined"
          /> */}

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
