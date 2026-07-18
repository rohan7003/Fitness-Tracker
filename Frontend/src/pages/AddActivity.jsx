import { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import activityService from "../services/activityService";
import CustomSnackbar from "../components/CustomSnackbar";

function AddActivity() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    type: "WALKING",
    duration: "",
    caloriesBurned: "",
    distance: "",
    pace: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const activityData = {
      userId,
      type: formData.type,
      duration: Number(formData.duration),
      caloriesBurned: Number(formData.caloriesBurned),
      additionalMetrics: {
        distance: Number(formData.distance),
        pace: Number(formData.pace),
      },
    };

    try {
      await activityService.createActivity(activityData);

      setSnackbar({
        open: true,
        message: "Activity Added Successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to Add Activity",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm">
        <Paper
          elevation={5}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add Activity
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              margin="normal"
              label="Activity Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
              <MenuItem value="YOGA">Yoga</MenuItem>
              <MenuItem value="SWIMMING">Swimming</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Duration (Minutes)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Calories Burned"
              name="caloriesBurned"
              type="number"
              value={formData.caloriesBurned}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Distance (KM)"
              name="distance"
              type="number"
              value={formData.distance}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Pace"
              name="pace"
              type="number"
              value={formData.pace}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Save Activity
            </Button>
          </Box>
        </Paper>
      </Container>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </>
  );
}

export default AddActivity;
