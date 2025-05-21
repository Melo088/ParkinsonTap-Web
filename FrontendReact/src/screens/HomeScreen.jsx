import React from 'react';
import { Typography, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SensorsIcon from '@mui/icons-material/Sensors';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Bienvenido al Sistema de Evaluación de Parkinson
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Este sistema le permite crear nuevos tests para la evaluación de pacientes con Parkinson
        y realizar la toma de datos mediante sensores conectados por MQTT.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<AssignmentIcon />}
          onClick={() => navigate('/form')}
        >
          Crear Nuevo Test
        </Button>
      </Box>
    </Paper>
  );
}

export default HomeScreen;