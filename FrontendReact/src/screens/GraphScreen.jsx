import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fade,
  Slide,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Timeline as TimelineIcon,
  ShowChart,
  RotateRight
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { readingService } from '../services/readingService';
import GraphChart from '../components/GraphChart';

const GraphScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { testId } = useParams();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!testId) {
      setError('ID de test no proporcionado en la URL');
      setLoading(false);
      return;
    }

    loadGraphData();
  }, [testId]);

  const loadGraphData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const graphData = await readingService.fetchGraphData(testId);
      
      if (graphData.length === 0) {
        setError('No se encontraron datos para este test');
      } else {
        setData(graphData);
        console.log('Datos de gráfica cargados:', graphData);
      }
    } catch (error) {
      console.error('Error al cargar datos de gráfica:', error);
      setError(error.message || 'Error al cargar los datos del gráfico');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/tests"); 
  };

  // Función para recargar datos
  const handleRefresh = () => {
    loadGraphData();
  };

  // Si no hay testId en la URL
  if (!testId) {
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
        <Container maxWidth="md">
          <Card
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3,
              p: 4,
              textAlign: 'center'
            }}
          >
            <ShowChart sx={{ fontSize: 64, color: alpha(theme.palette.text.secondary, 0.3), mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
              ID de Test No Encontrado
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              No se proporcionó un ID de test válido en la URL
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Regresar
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  // Pantalla de carga
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
            Cargando datos del test...
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
      <Container maxWidth="xl" sx={{ pt: 3 }}>
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
                    <TimelineIcon sx={{ color: 'white', fontSize: 24 }} />
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
                      Análisis de Datos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visualización de datos del test #{testId}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handleGoBack}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Regresar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<RotateRight />}
                    onClick={handleRefresh}
                    disabled={loading}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Actualizar
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Error Alert */}
        {error && (
          <Slide direction="down" in={Boolean(error)} timeout={300}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
              }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleRefresh}
                >
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          </Slide>
        )}

        {/* Stats Section */}
        {data.length > 0 && (
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
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <ShowChart sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Puntos de Datos
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total de lecturas registradas
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={data.length.toLocaleString()}
                    sx={{
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}, 
                        ${theme.palette.primary.dark})`,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      height: 40,
                      minWidth: 80
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Charts Grid */}
        {data.length > 0 && (
          <Fade in timeout={1000}>
            <Grid container spacing={4}>
              {/* Gráfica del Acelerómetro */}
              <Grid size={{ xs: 12, lg: 6 }}>
                 <GraphChart
                  data={data}
                  title="Acelerómetro"
                  dataKeys={[
                    { key: 'ax', axis: 'left', color: '#1976d2' },
                    { key: 'ay', axis: 'left', color: '#dc004e' },
                    { key: 'az', axis: 'left', color: '#2e7d32' }
                  ]}
                  yAxisLabelLeft="Aceleración (m/s²)"
                />
              </Grid>

              {/* Gráfica del Giroscopio - Roll y Pitch */}
              <Grid size={{ xs: 12, lg: 6 }}>
                 <GraphChart
                  data={data}
                  title="Giroscopio - Roll, Pitch y Yaw"
                  dataKeys={[
                    { key: 'p', axis: 'left', color: '#ff9800' },
                    { key: 'r', axis: 'left', color: '#9c27b0' },
                    { key: 'y', axis: 'left', color: '#f44336' }
                  ]}
                  yAxisLabelLeft="Ángulo (°)"
                />
              </Grid>

              {/* ax + Roll */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <GraphChart
                  data={data}
                  title="Aceleración X y Roll"
                  dataKeys={[
                    { key: 'ax', axis: 'left', color: '#1976d2' },
                    { key: 'r', axis: 'right', color: '#9c27b0' }
                  ]}
                  yAxisLabelLeft="Aceleración (m/s²)"
                  yAxisLabelRight="Ángulo (°)"
                />
              </Grid>

              {/* ay + Pitch */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <GraphChart
                  data={data}
                  title="Aceleración Y y Pitch"
                  dataKeys={[
                    { key: 'ay', axis: 'left', color: '#dc004e' },
                    { key: 'p', axis: 'right', color: '#ff9800' }
                  ]}
                  yAxisLabelLeft="Aceleración (m/s²)"
                  yAxisLabelRight="Ángulo (°)"
                />
              </Grid>

              {/* az + Yaw */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <GraphChart
                  data={data}
                  title="Aceleración Z y Yaw"
                  dataKeys={[
                    { key: 'az', axis: 'left', color: '#2e7d32' },
                    { key: 'y', axis: 'right', color: '#f44336' }
                  ]}
                  yAxisLabelLeft="Aceleración (m/s²)"
                  yAxisLabelRight="Ángulo (°)"
                />
                </Grid>
            </Grid>
          </Fade>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <Fade in timeout={600}>
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
                <ShowChart 
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
                  No hay datos disponibles
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Este test no tiene datos de sensores registrados
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RotateRight />}
                  onClick={handleRefresh}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Verificar nuevamente
                </Button>
              </Box>
            </Card>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default GraphScreen;