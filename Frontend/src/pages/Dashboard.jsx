import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Navbar from "../components/Navbar";
import activityService from "../services/activityService";
import recommendationService from "../services/recommendationService";

function Dashboard() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const loadActivities = async () => {
    try {
      const data = await activityService.getActivitiesByUser(userId);
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadRecommendations = async () => {
    try {
      const data = await recommendationService.getRecommendationsByUser(userId);

      setRecommendations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadActivities();
      loadRecommendations();
    }
  }, []);

  const totalActivities = activities.length;

  const totalCalories = activities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0,
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return <DirectionsRunIcon color="error" />;

      case "WALKING":
        return <DirectionsWalkIcon color="success" />;

      case "CYCLING":
        return <DirectionsBikeIcon color="primary" />;

      case "YOGA":
        return <SelfImprovementIcon color="secondary" />;

      case "SWIMMING":
        return <PoolIcon color="info" />;

      default:
        return <FitnessCenterIcon />;
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {localStorage.getItem("userName")} 👋
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Track your fitness journey.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6">Activities</Typography>

                <Typography variant="h3">{totalActivities}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6">Calories Burned</Typography>

                <Typography variant="h3">{totalCalories}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6">Recommendations</Typography>

                <Typography variant="h3">{recommendations.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button variant="contained" onClick={() => navigate("/add-activity")}>
            Add Activity
          </Button>

          <Button variant="outlined" onClick={() => navigate("/activities")}>
            View Activities
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/recommendations")}
          >
            Recommendations
          </Button>
        </Box>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Recent Activities
        </Typography>

        {activities.length === 0 ? (
          <Typography color="text.secondary">No activities found.</Typography>
        ) : (
          activities.slice(0, 3).map((activity) => (
            <Card
              key={activity.id}
              elevation={3}
              sx={{
                mb: 2,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  {getActivityIcon(activity.type)}

                  <Typography variant="h6" fontWeight="bold">
                    {activity.type}
                  </Typography>
                </Box>

                <Typography color="text.secondary">
                  ⏱ {activity.duration} Minutes
                </Typography>

                <Typography color="text.secondary">
                  🔥 {activity.caloriesBurned} Calories Burned
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }} color="primary">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default Dashboard;
