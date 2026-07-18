import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import activityService from "../services/activityService";
import recommendationService from "../services/recommendationService";

function ActivityHistory() {
  const [activities, setActivities] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const loadActivities = async () => {
    try {
      const data = await activityService.getActivitiesByUser(userId);
      setActivities(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load activities");
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await activityService.deleteActivity(activityId);

      alert("Activity Deleted Successfully!");

      loadActivities();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };
const handleRecommendation = async (activityId) => {
  try {
    await recommendationService.generateRecommendation(activityId);

    alert("Recommendation Generated Successfully!");

    navigate("/recommendations");
  } catch (error) {
    console.error(error);

    alert("Failed to Generate Recommendation");
  }
};

  useEffect(() => {
    if (userId) {
      loadActivities();
    }
  }, []);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Activity History
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>

                  <TableCell>{activity.duration}</TableCell>

                  <TableCell>{activity.caloriesBurned}</TableCell>

                  <TableCell>
                    {new Date(activity.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleDelete(activity.id)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleRecommendation(activity.id)}
                    >
                      Recommend
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

export default ActivityHistory;
