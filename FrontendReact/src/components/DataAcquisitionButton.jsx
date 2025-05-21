import React from 'react';
import { 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Chip 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function DataAcquisitionButton({ testId, onStartTest }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Toma de datos
      </Typography>
      
      <Typography variant="body1" paragraph>
        Puede iniciar la toma de datos <strong>pulsando el botón</strong>
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
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        startIcon={<PlayArrowIcon />}
        onClick={onStartTest}
      >
        Iniciar Prueba
      </Button>
    </Paper>
  );
}

export default DataAcquisitionButton;