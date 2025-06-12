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
  Assessment as AssessmentIcon,
  PersonAdd,
  ExitToApp,
  People,
  LocalHospital,
  HealthAndSafety
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { evaluatedService } from '../services/evaluatedService';
import EvaluatedCard from '../components/EvaluatedCard';
import EvaluatedForm from '../components/EvaluatedForm';
import Grid from '@mui/material/Grid';

console.log('EvaluatedScreen loaded');

const EvaluatedScreen = () => {
  const theme = useTheme();
  const [evaluatedList, setEvaluatedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadEvaluated();
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const loadEvaluated = async () => {
    try {
      setLoading(true);
      const evaluatedData = await evaluatedService.getAllEvaluated();
      setEvaluatedList(evaluatedData);
      setError('');
    } catch (error) {
      setError('Error al cargar los evaluados: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvaluated = async (evaluatedData) => {
    try {
      await evaluatedService.registerEvaluated(evaluatedData);
      await loadEvaluated();
      setError('');
      setSuccess('Evaluado agregado correctamente.');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError('Error al agregar evaluado: ' + error.message);
      setSuccess('');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleDeleteEvaluated = async (evaluatedId) => {
    try {
      await evaluatedService.deleteEvaluated(evaluatedId);
      await loadEvaluated();
      setError('');
      setSuccess('Evaluado eliminado correctamente.');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError('Error al eliminar evaluado: ' + error.message);
      setSuccess('');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleAdministrateTests = () => {
    
    navigate('/tests');
  };

  // Separar pacientes y controles 
  const patients = evaluatedList.filter(evaluated => {
    const isPatient = evaluated.evaluatedTypeName?.toLowerCase() === 'pacientes';
    return isPatient;
  });
  
  const controls = evaluatedList.filter(evaluated => {
    const isControl = evaluated.evaluatedTypeName?.toLowerCase() === 'controles';
    return isControl;
  });

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
            Cargando evaluados...
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
                    <People sx={{ color: 'white', fontSize: 24 }} />
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
                      Gestión de Evaluados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Administra pacientes y controles del sistema
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
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                    onClick={handleAdministrateTests}
                    disabled={evaluatedList.length === 0}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      borderColor: alpha(theme.palette.secondary.main, 0.3),
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        background: alpha(theme.palette.secondary.main, 0.04)
                      },
                      '&:disabled': {
                        opacity: 0.6,
                        borderColor: alpha(theme.palette.text.disabled, 0.3),
                        color: theme.palette.text.disabled
                      }
                    }}
                  >
                    Administrar Test
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
                    Agregar Evaluado
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

          {/* Info alert cuando no hay evaluados */}
          {evaluatedList.length === 0 && (
            <Slide direction="down" in={evaluatedList.length === 0} timeout={300}>
              <Alert 
                severity="info" 
                sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                }}
              >
                No hay evaluados registrados. Agregue al menos un evaluado para poder crear tests.
              </Alert>
            </Slide>
          )}
        </Box>

        {/* Stats Section */}
        <Fade in timeout={800}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Total Evaluados */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={2}>
                      <People sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Total Evaluados
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pacientes y controles
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={evaluatedList.length}
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
            </Grid>

            {/* Pacientes */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={2}>
                      <LocalHospital sx={{ color: theme.palette.error.main, fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Pacientes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Casos a tratar
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={patients.length}
                      sx={{
                        background: `linear-gradient(135deg, 
                          ${theme.palette.error.main}, 
                          ${theme.palette.error.dark})`,
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
            </Grid>

            {/* Controles */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={2}>
                      <HealthAndSafety sx={{ color: theme.palette.success.main, fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Controles
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Casos a evaluar
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={controls.length}
                      sx={{
                        background: `linear-gradient(135deg, 
                          ${theme.palette.success.main}, 
                          ${theme.palette.success.dark})`,
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
            </Grid>
          </Grid>
        </Fade>

        {/* Sección de Pacientes */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <LocalHospital sx={{ color: theme.palette.error.main, fontSize: 32 }} />
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.error.main
                }}
              >
                Pacientes ({patients.length})
              </Typography>
            </Box>
            
            {patients.length === 0 ? (
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  py: 6
                }}
              >
                <Box textAlign="center">
                  <LocalHospital 
                    sx={{ 
                      fontSize: 48, 
                      color: alpha(theme.palette.error.main, 0.3),
                      mb: 2 
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    No hay pacientes registrados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Los pacientes aparecerán aquí una vez agregados
                  </Typography>
                </Box>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {patients.map((evaluated, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evaluated.id}>
                    <Fade in timeout={600 + (index * 100)}>
                      <Box>
                        <EvaluatedCard
                          evaluated={evaluated}
                          onDelete={handleDeleteEvaluated}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>

        {/* Sección de Controles */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <HealthAndSafety sx={{ color: theme.palette.success.main, fontSize: 32 }} />
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.success.main
                }}
              >
                Controles ({controls.length})
              </Typography>
            </Box>
            
            {controls.length === 0 ? (
              <Card
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 3,
                  py: 6
                }}
              >
                <Box textAlign="center">
                  <HealthAndSafety 
                    sx={{ 
                      fontSize: 48, 
                      color: alpha(theme.palette.success.main, 0.3),
                      mb: 2 
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    No hay controles registrados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Los controles aparecerán aquí una vez agregados
                  </Typography>
                </Box>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {controls.map((evaluated, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evaluated.id}>
                    <Fade in timeout={600 + (index * 100)}>
                      <Box>
                        <EvaluatedCard
                          evaluated={evaluated}
                          onDelete={handleDeleteEvaluated}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Fade>

        {/* Formulario Modal */}
        <EvaluatedForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSuccess={handleAddEvaluated}
        />

        {/* Floating Action Button */}
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
      </Container>
    </Box>
  );
};

export default EvaluatedScreen;