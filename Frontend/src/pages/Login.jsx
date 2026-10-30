import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import authService from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(formData);

      localStorage.setItem("token", response.token);

      if (response.user) {
        localStorage.setItem("userId", response.user.id);
        localStorage.setItem("userName", response.user.firstName);
        localStorage.setItem("userEmail", response.user.email);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Panel */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#081B4B 0%,#1D4ED8 60%,#2563EB 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          px: { xs: 4, md: 8 },
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(255,255,255,.05)",
            top: -120,
            right: -120,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(255,255,255,.04)",
            bottom: -80,
            left: -80,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 560 }}>
          <Avatar
            sx={{
              width: 95,
              height: 95,
              bgcolor: "#fff",
              color: "#2563eb",
              mb: 5,
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 52 }} />
          </Avatar>

          <Typography
            sx={{
              fontSize: { xs: 42, md: 70 },
              fontWeight: 800,
              lineHeight: 1.05,
              mb: 3,
            }}
          >
            Stronger Today,
            <br />
            Better Tomorrow.
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              opacity: 0.9,
              maxWidth: 500,
              lineHeight: 1.8,
              mb: 5,
            }}
          >
            Track every workout, monitor your progress and stay motivated with
            personalized fitness recommendations.
          </Typography>

          <Box
            sx={{
              width: 220,
              height: 4,
              borderRadius: 10,
              bgcolor: "#60A5FA",
              mb: 5,
            }}
          />

          {[
            "Track daily workouts",
            "Personalized recommendations",
            "Monitor your fitness journey",
          ].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <CheckCircleIcon
                sx={{
                  mr: 2,
                  color: "#BBF7D0",
                  fontSize: 30,
                }}
              />

              <Typography
                sx={{
                  fontSize: 22,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}

          <Paper
            sx={{
              mt: 7,
              bgcolor: "rgba(255,255,255,.10)",
              backdropFilter: "blur(12px)",
              color: "white",
              borderRadius: 4,
              p: 3,
              width: 430,
            }}
          >
            <Typography fontWeight="bold" sx={{ fontSize: 24 }}>
              🏆 Your Fitness. Your Journey.
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Let's achieve your goals together!
            </Typography>
          </Paper>
        </Box>

        {/* Runner Image */}
        <Box
          component="img"
          src="/runner.png"
          alt="Runner"
          sx={{
            position: "absolute",
            top: "50%",
            left: "21%",
            transform: "translate(-20%, -50%)",
            width: "95%",
            height: "95%",
            objectFit: "contain",
            opacity: 0.12,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        />
      </Grid>

      {/* Right Panel */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
          p: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: 460,
            maxWidth: "100%",
            p: 6,
            borderRadius: 5,
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center">
            Welcome Back 👋
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 1, mb: 4 }}
          >
            Sign in to access your dashboard
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 4,
                py: 1.8,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 3 }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1976d2",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
