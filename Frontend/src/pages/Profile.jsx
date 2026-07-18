import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import Navbar from "../components/Navbar";
import userService from "../services/userService";

function Profile() {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile(userId);
      setProfile(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 5, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              👤 My Profile
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2">First Name</Typography>

            <Typography variant="h6" gutterBottom>
              {profile.firstName}
            </Typography>

            <Typography variant="subtitle2">Last Name</Typography>

            <Typography variant="h6" gutterBottom>
              {profile.lastName}
            </Typography>

            <Typography variant="subtitle2">Email</Typography>

            <Typography variant="h6" gutterBottom>
              {profile.email}
            </Typography>

            <Typography variant="subtitle2">Member Since</Typography>

            <Typography variant="h6">
              {new Date(profile.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Profile;
