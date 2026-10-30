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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import authService from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      await authService.register(formData);

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed!");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Panel */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1d4ed8 60%,#3b82f6 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, md: 8 },
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#fff",
            color: "#1d4ed8",
            mb: 4,
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: 50 }} />
        </Avatar>

        <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
          Join Fitness Tracker
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            maxWidth: 450,
            mb: 5,
            lineHeight: 1.7,
          }}
        >
          Create your account and start tracking workouts, monitoring progress,
          and achieving your fitness goals.
        </Typography>

        {[
          "Secure user account",
          "Track daily workouts",
          "Receive personalized recommendations",
        ].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <CheckCircleIcon sx={{ mr: 2, color: "#BBF7D0" }} />
            <Typography fontSize={18}>{item}</Typography>
          </Box>
        ))}
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
            width: 500,
            maxWidth: "100%",
            p: 6,
            borderRadius: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#1976d2",
                width: 60,
                height: 60,
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Avatar>
          </Box>

          <Typography variant="h4" fontWeight="bold" align="center">
            Create Account
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 1, mb: 4 }}
          >
            Register to begin your fitness journey
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

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
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Create Account
            </Button>

            <Typography align="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
