import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService'; 
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Fab,
  Card,
  CardContent,
  Divider,
  Chip,
  useTheme,
  alpha,
  Fade,
  Slide
} from '@mui/material';
import { 
  Add as AddIcon, 
  PersonAdd,
  AdminPanelSettings,
  ExitToApp,
  People
} from '@mui/icons-material';
import { doctorService } from '../services/doctorService';
import DoctorCard from '../components/DoctorCard';
import DoctorForm from '../components/DoctorForm';
import Grid from '@mui/material/Grid';

console.log('AdminScreen loaded');

const AdminScreen = () => {
  const theme = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const doctorsData = await doctorService.getAllDoctors();
      console.log('Doctors loaded:', doctorsData);
      setDoctors(doctorsData);
      setError('');
    } catch (error) {
      setError('Error al cargar los doctores: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (doctorData) => {
    try {
      await doctorService.registerDoctor(doctorData);
      await loadDoctors();
      setError('');
      setSuccess('Doctor agregado correctamente.');

      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError('Error al agregar doctor: ' + error.message);
      setSuccess('');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await doctorService.deleteDoctor(doctorId);
      await loadDoctors();
      setError('');
      setSuccess('Doctor eliminado correctamente.');
      console.log('Doctor deleted:', doctorId);
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (error) {
      setError('Error al eliminar doctor: ' + error.message);
      console.error('Error deleting doctor:', error);
      setSuccess('');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.05)} 0%, 
            ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={48} 
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2 
            }} 
          />
          <Typography variant="body1" color="text.secondary">
            Cargando panel de administración...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.02)} 0%, 
          ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        pb: 4
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Header Section */}
        <Fade in timeout={600}>
          <Card
            elevation={0}
            sx={{
              mb: 4,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.primary.dark})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <AdminPanelSettings sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      component="h1" 
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mb: 0.5
                      }}
                    >
                      Panel de Administración
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gestiona los doctores del sistema
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    startIcon={<ExitToApp />}
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      borderColor: alpha(theme.palette.error.main, 0.3),
                      color: theme.palette.error.main,
                      '&:hover': {
                        borderColor: theme.palette.error.main,
                        background: alpha(theme.palette.error.main, 0.04)
                      }
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    onClick={() => setOpenForm(true)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.primary.dark})`,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.dark}, 
                          ${theme.palette.primary.main})`,
                        boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`
                      }
                    }}
                  >
                    Nuevo Doctor
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Alerts Section */}
        <Box sx={{ mb: 3 }}>
          {success && (
            <Slide direction="down" in={Boolean(success)} timeout={300}>
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                }}
              >
                {success}
              </Alert>
            </Slide>
          )}

          {error && (
            <Slide direction="down" in={Boolean(error)} timeout={300}>
              <Alert 
                severity="error" 
                sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                }}
              >
                {error}
              </Alert>
            </Slide>
          )}
        </Box>

        {/* Stats Section */}
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 4,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={2}>
                  <People sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Doctores Registrados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total de profesionales en el sistema
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={doctors.length}
                  sx={{
                    background: `linear-gradient(135deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.primary.dark})`,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    height: 40,
                    minWidth: 60
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Doctors Grid */}
        <Fade in timeout={1000}>
          <Box>
            {doctors.length === 0 ? (
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  py: 8
                }}
              >
                <Box textAlign="center">
                  <People 
                    sx={{ 
                      fontSize: 64, 
                      color: alpha(theme.palette.text.secondary, 0.3),
                      mb: 2 
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    No hay doctores registrados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comienza agregando el primer doctor al sistema
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    onClick={() => setOpenForm(true)}
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.primary.dark})`
                    }}
                  >
                    Agregar Primer Doctor
                  </Button>
                </Box>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {doctors.map((doctor, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doctor.id}>
                    <Fade in timeout={600 + (index * 100)}>
                      <Box>
                        <DoctorCard
                          doctor={doctor}
                          onDelete={handleDeleteDoctor}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>

        {/* Doctor Form Dialog */}
        <DoctorForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSuccess={handleAddDoctor}
        />

        {/* Floating Action Button */}
        {doctors.length > 0 && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpenForm(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.primary.dark})`,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.dark}, 
                  ${theme.palette.primary.main})`,
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <AddIcon />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default AdminScreen;