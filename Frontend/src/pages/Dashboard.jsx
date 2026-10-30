import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RecommendIcon from "@mui/icons-material/Recommend";

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

      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 5,
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome back, {localStorage.getItem("userName")} 👋
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Here's an overview of your fitness progress.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 5,
                color: "white",
                background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,.25)",
                    mb: 2,
                  }}
                >
                  <FitnessCenterIcon />
                </Avatar>

                <Typography variant="h6">Total Activities</Typography>

                <Typography variant="h3" fontWeight="bold">
                  {totalActivities}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 5,
                color: "white",
                background: "linear-gradient(135deg,#ea580c,#fb923c)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,.25)",
                    mb: 2,
                  }}
                >
                  <LocalFireDepartmentIcon />
                </Avatar>

                <Typography variant="h6">Calories Burned</Typography>

                <Typography variant="h3" fontWeight="bold">
                  {totalCalories}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 5,
                color: "white",
                background: "linear-gradient(135deg,#059669,#10b981)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,.25)",
                    mb: 2,
                  }}
                >
                  <RecommendIcon />
                </Avatar>

                <Typography variant="h6">Recommendations</Typography>

                <Typography variant="h3" fontWeight="bold">
                  {recommendations.length}
                </Typography>
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
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: 3,
            }}
            onClick={() => navigate("/add-activity")}
          >
            Add Activity
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: 3,
            }}
            onClick={() => navigate("/activities")}
          >
            View Activities
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: 3,
            }}
            onClick={() => navigate("/recommendations")}
          >
            Recommendations
          </Button>
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mt: 6,
            mb: 3,
          }}
        >
          Recent Activities
        </Typography>
        {activities.length === 0 ? (
          <Card
            elevation={2}
            sx={{
              borderRadius: 4,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No activities found.
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Start by adding your first workout.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 3,
                px: 4,
              }}
              onClick={() => navigate("/add-activity")}
            >
              Add Activity
            </Button>
          </Card>
        ) : (
          activities.slice(0, 3).map((activity) => (
            <Card
              key={activity.id}
              elevation={4}
              sx={{
                mb: 3,
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 10,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#EEF4FF",
                        color: "#2563eb",
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Avatar>

                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {activity.type}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={`${activity.duration} mins`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>

                    <Typography fontWeight="bold">
                      {activity.duration} min
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Calories
                    </Typography>

                    <Typography fontWeight="bold" color="error.main">
                      🔥 {activity.caloriesBurned}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Activity
                    </Typography>

                    <Typography fontWeight="bold">{activity.type}</Typography>
                  </Grid>

                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>

                    <Chip label="Completed" color="success" size="small" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default Dashboard;