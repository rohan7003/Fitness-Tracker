import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Navbar from "../components/Navbar";
import recommendationService from "../services/recommendationService";

function Recommendation() {
  const userId = localStorage.getItem("userId");
  const [recommendations, setRecommendations] = useState([]);

  const loadRecommendations = async () => {
    if (!userId) return;

    try {
      const data = await recommendationService.getRecommendationsByUser(userId);

      setRecommendations(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load recommendations");
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);


  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Recommendations
        </Typography>

        {/* <Paper elevation={4} sx={{ p: 3, mb: 4 }}>

        </Paper> */}

        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{recommendation.type}</Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Recommendation</strong>
              </Typography>

              <Typography>{recommendation.recommendation}</Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Improvements</strong>
              </Typography>

              <ul>
                {recommendation.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <Typography>
                <strong>Suggestions</strong>
              </Typography>

              <ul>
                {recommendation.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <Typography>
                <strong>Safety</strong>
              </Typography>

              <ul>
                {recommendation.safety.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default Recommendation;
