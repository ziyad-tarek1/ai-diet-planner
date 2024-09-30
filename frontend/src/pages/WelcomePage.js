import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, CircularProgress } from '@mui/material';

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to AI Diet Planner
      </Typography>
      <Typography variant="body1" paragraph>
        Get personalized diet recommendations based on your preferences and health goals.
      </Typography>
      <Button component={Link} to="/questionnaire" variant="contained" color="primary">
        Start Questionnaire
      </Button>
    </div>
  );
};

export default WelcomePage;
