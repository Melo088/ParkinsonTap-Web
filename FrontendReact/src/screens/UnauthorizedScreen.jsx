import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Lock as LockIcon } from '@mui/icons-material';
import { authService } from '../services/authService';

const UnauthorizedScreen = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const userRole = authService.getUserRole();
    if (userRole === 'ADMIN') {
      navigate('/admin');
    } else if (userRole === 'DOCTOR') {
      navigate('/doctor');
    } else {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <LockIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Acceso Denegado
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          No tienes permisos para acceder a esta página.
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoBack}
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              authService.logout();
              navigate('/login');
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UnauthorizedScreen;