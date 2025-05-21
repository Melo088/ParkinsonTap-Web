import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import DataAcquisitionButton from '../components/DataAcquisitionButton';
import { connectMQTT, sendStartMessage } from '../services/dataAcquisitionService';

function DataAcquisitionScreen() {
  const { testId } = useParams();
  
  useEffect(() => {
    // Conectar al broker MQTT cuando se monta el componente
    connectMQTT();
  }, []);

  const handleStartTest = () => {
    if (testId) {
      sendStartMessage(testId);
    } else {
      console.error("No hay testId disponible");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Adquisición de Datos
      </Typography>
      
      {!testId && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          No se ha proporcionado un ID de test válido.
        </Alert>
      )}
      
      <DataAcquisitionButton 
        testId={testId} 
        onStartTest={handleStartTest} 
      />
    </Box>
  );
}

export default DataAcquisitionScreen;