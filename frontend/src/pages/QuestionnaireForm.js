import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const QuestionnaireForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({ open: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    religion: '',
    activityLevel: '',
    height: '',
    weight: '',
    healthConditions: '',
    medications: '',
    goals: '',
    dietaryPreferences: [],
    exercisePreferences: [],
    sleepHours: '',
    stressLevel: '',
    phoneUsage: '',
    sport: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], event.target.value] });
    } else {
      setFormData({ ...formData, [name]: formData[name].filter(item => item !== event.target.value) });
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formData.name && formData.age && formData.gender;
      case 1:
        return formData.height && formData.weight && formData.activityLevel;
      case 2:
        return formData.sleepHours && formData.stressLevel;
      case 3:
        return formData.goals && formData.dietaryPreferences.length > 0 && formData.exercisePreferences.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setError({ open: true, message: 'Please fill in all required fields before proceeding.' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful:', result);
        navigate('/results', { state: { formData } });
      } else {
        const errorData = await response.json();
        setError({ open: true, message: errorData.message || 'Submission failed' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError({ open: true, message: 'Error submitting form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledFormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledFormControl fullWidth>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                >
                  <MenuItem value="sedentary">Sedentary</MenuItem>
                  <MenuItem value="lightly_active">Lightly Active</MenuItem>
                  <MenuItem value="moderately_active">Moderately Active</MenuItem>
                  <MenuItem value="very_active">Very Active</MenuItem>
                  <MenuItem value="extra_active">Extra Active</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Health Conditions"
                name="healthConditions"
                value={formData.healthConditions}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medications"
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sleep Hours"
                name="sleepHours"
                type="number"
                value={formData.sleepHours}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledFormControl fullWidth>
                <InputLabel>Stress Level</InputLabel>
                <Select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Usage (hours per day)"
                name="phoneUsage"
                type="number"
                value={formData.phoneUsage}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preferred Sport (optional)"
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
              />
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid item xs={12}>
              <StyledFormControl fullWidth>
                <InputLabel>Goals</InputLabel>
                <Select
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                >
                  <MenuItem value="weight_loss">Weight Loss</MenuItem>
                  <MenuItem value="weight_gain">Weight Gain</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Dietary Preferences
              </Typography>
              {['vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo'].map((pref) => (
                <FormControlLabel
                  key={pref}
                  control={
                    <Checkbox
                      checked={formData.dietaryPreferences.includes(pref)}
                      onChange={handleCheckboxChange}
                      name="dietaryPreferences"
                      value={pref}
                    />
                  }
                  label={pref.charAt(0).toUpperCase() + pref.slice(1)}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom style={{ marginTop: '20px' }}>
                Exercise Preferences
              </Typography>
              {['cardio', 'strength_training', 'yoga', 'swimming', 'cycling'].map((pref) => (
                <FormControlLabel
                  key={pref}
                  control={
                    <Checkbox
                      checked={formData.exercisePreferences.includes(pref)}
                      onChange={handleCheckboxChange}
                      name="exercisePreferences"
                      value={pref}
                    />
                  }
                  label={pref.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                />
              ))}
            </Grid>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  const steps = ['Personal Information', 'Health Information', 'Lifestyle', 'Diet Preferences'];

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        AI Diet Planner Questionnaire
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed - you're finished</Typography>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </div>
        ) : (
          <div>
            <Grid container spacing={3}>
              {renderStepContent(activeStep)}
            </Grid>
            <div style={{ marginTop: '20px' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <ErrorMessage
        open={error.open}
        message={error.message}
        onClose={() => setError({ ...error, open: false })}
      />
    </StyledContainer>
  );
};

export default QuestionnaireForm;
