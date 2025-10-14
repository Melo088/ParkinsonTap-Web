import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import DataAcquisitionButton from '../components/DataAcquisitionButton';
import { connectMQTT, sendStartMessage } from '../services/dataAcquisitionService';
import { useNavigate } from 'react-router-dom';

function DataAcquisitionScreen() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'collecting', 'uploading', 'success', 'error'
    const [error, setError] = useState(null);

    useEffect(() => {
        // Conectar al broker MQTT cuando se monta el componente
        connectMQTT();
    }, []);

    const handleStartTest = async (duration) => {
        if (!testId) {
            console.error("No hay testId disponible");
            return;
        }

        setIsLoading(true);
        setStatus('collecting');
        setError(null);

        try {
            // Simular el tiempo de recolección
            setTimeout(() => {
                if (status === 'collecting') {
                    setStatus('uploading');
                }
            }, duration * 1000);

            // Enviar mensaje y esperar confirmación
            const result = await sendStartMessage(testId, duration);
            
            setStatus('success');
            setIsLoading(false);
            
            // Esperar un momento para mostrar el éxito, luego redirigir
            setTimeout(() => {
                navigate(`/grafica/${testId}`);
            }, 2000);
            
        } catch (error) {
            console.error('Error durante la prueba:', error);
            setStatus('error');
            setError(error.message);
            setIsLoading(false);
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
                isLoading={isLoading}
                status={status}
                error={error}
            />
        </Box>
    );
}

export default DataAcquisitionScreen;