import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimerIcon from '@mui/icons-material/Timer';

function DataAcquisitionButton({ testId, onStartTest }) {
  const [duration, setDuration] = useState(10); // Duración por defecto en segundos
  
  const durationOptions = [
    { value: 5, label: '5 segundos' },
    { value: 10, label: '10 segundos' },
    { value: 15, label: '15 segundos' },
    { value: 20, label: '20 segundos' },
    { value: 30, label: '30 segundos' },
    { value: 45, label: '45 segundos' },
    { value: 60, label: '1 minuto' }
  ];

  const handleStartTest = () => {
    onStartTest(duration);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Toma de datos
      </Typography>
      <Typography variant="body1" >
        Seleccione la duración de la prueba y pulse el botón para iniciar
      </Typography>
      
      {testId && (
        <Box sx={{ mb: 3 }}>
          <Chip
            label={`ID del test: ${testId}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="duration-select-label">
            <TimerIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Duración de la prueba
          </InputLabel>
          <Select
            labelId="duration-select-label"
            value={duration}
            label="Duración de la prueba"
            onChange={(e) => setDuration(e.target.value)}
          >
            {durationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Alert severity="info" sx={{ mb: 2, textAlign: 'left' }}>
        <Typography variant="body2">
          <strong>Duración seleccionada:</strong> {duration} segundos
          <br />
          <strong>Lecturas aproximadas:</strong> {Math.round(duration * 25)} muestras (25 Hz)
        </Typography>
      </Alert>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<PlayArrowIcon />}
        onClick={handleStartTest}
      >
        Iniciar Prueba ({duration}s)
      </Button>
    </Paper>
  );
}

export default DataAcquisitionButton;