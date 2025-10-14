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
    Alert,
    CircularProgress,
    LinearProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function DataAcquisitionButton({ testId, onStartTest, isLoading, status, error }) {
    const [duration, setDuration] = useState(10);
    
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

    const getStatusColor = () => {
        switch (status) {
            case 'collecting': return 'warning';
            case 'uploading': return 'info';
            case 'success': return 'success';
            case 'error': return 'error';
            default: return 'info';
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'collecting': return 'Recolectando datos del sensor...';
            case 'uploading': return 'Enviando datos al servidor...';
            case 'success': return 'Datos enviados correctamente';
            case 'error': return error || 'Error en la transmisión de datos';
            default: return '';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'collecting':
            case 'uploading':
                return <CircularProgress size={20} />;
            case 'success':
                return <CheckCircleIcon />;
            case 'error':
                return <ErrorIcon />;
            default:
                return null;
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Toma de datos
            </Typography>
            <Typography variant="body1">
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
                <FormControl sx={{ minWidth: 200 }} disabled={isLoading}>
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

            {!isLoading && !status && (
                <Alert severity="info" sx={{ mb: 2, textAlign: 'left' }}>
                    <Typography variant="body2">
                        <strong>Duración seleccionada:</strong> {duration} segundos
                        <br />
                        <strong>Lecturas aproximadas:</strong> {Math.round(duration * 25)} muestras (25 Hz)
                    </Typography>
                </Alert>
            )}

            {status && (
                <>
                    <Alert 
                        severity={getStatusColor()} 
                        sx={{ mb: 2, textAlign: 'left' }}
                        icon={getStatusIcon()}
                    >
                        <Typography variant="body2">
                            <strong>Estado:</strong> {getStatusMessage()}
                        </Typography>
                    </Alert>
                    
                    {(status === 'collecting' || status === 'uploading') && (
                        <Box sx={{ mb: 2 }}>
                            <LinearProgress 
                                color={status === 'collecting' ? 'warning' : 'info'}
                            />
                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                {status === 'collecting' 
                                    ? `Recolectando datos por ${duration} segundos...`
                                    : 'Enviando datos al servidor...'
                                }
                            </Typography>
                        </Box>
                    )}
                </>
            )}

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                onClick={handleStartTest}
                disabled={isLoading}
            >
                {isLoading ? 'Procesando...' : `Iniciar Prueba (${duration}s)`}
            </Button>

            {status === 'error' && (
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </Button>
                </Box>
            )}
        </Paper>
    );
}

export default DataAcquisitionButton;