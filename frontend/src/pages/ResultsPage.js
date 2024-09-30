
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await fetch('http://localhost:5000/generate-diet-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setDietPlan(data.diet_plan);
        } else {
          setError('Failed to generate diet plan');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    if (formData) {
      fetchDietPlan();
    } else {
      setError('No form data available');
      setLoading(false);
    }
  }, [formData]);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Personalized Diet Plan</Typography>
      
      <Typography variant="body1">{dietPlan}</Typography>
    </Container>
  );
};

export default ResultsPage;



