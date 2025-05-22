import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Fab
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { evaluatedService } from '../services/evaluatedService';
import EvaluatedCard from '../components/EvaluatedCard';
import Grid from '@mui/material/Grid';

console.log('EvaluatedScreen loaded');

const EvaluatedScreen = () => {
  const [evaluatedList, setEvaluatedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    loadEvaluated();
  }, []);

  const loadEvaluated = async () => {
    try {
      setLoading(true);
      const evaluatedData = await evaluatedService.getAllEvaluated();
      console.log('Evaluated loaded:', evaluatedData);
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
      await loadEvaluated(); // Recargar la lista
      setError('');
    } catch (error) {
      setError('Error al agregar evaluado: ' + error.message);
    }
  };

  const handleDeleteEvaluated = async (evaluatedId) => {
    try {
      await evaluatedService.deleteEvaluated(evaluatedId);
      await loadEvaluated(); // Recargar la lista
      setError('');
    } catch (error) {
      setError('Error al eliminar evaluado: ' + error.message);
    }
  };

  // Separar pacientes y controles
  const patients = evaluatedList.filter(evaluated => 
    evaluated.evaluatedType?.name?.toLowerCase() === 'pacientes'
  );
  const controls = evaluatedList.filter(evaluated => 
    evaluated.evaluatedType?.name?.toLowerCase() === 'controles'
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Gestión de Evaluados
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Agregar Evaluado
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Sección de Pacientes */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom color="error">
          Pacientes ({patients.length})
        </Typography>
        {patients.length === 0 ? (
          <Box textAlign="center" py={2} sx={{ bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body1" color="text.secondary">
              No hay pacientes registrados
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {patients.map((evaluated) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evaluated.id}>
                <EvaluatedCard
                  evaluated={evaluated}
                  onDelete={handleDeleteEvaluated}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Sección de Controles */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom color="success.main">
          Controles ({controls.length})
        </Typography>
        {controls.length === 0 ? (
          <Box textAlign="center" py={2} sx={{ bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body1" color="text.secondary">
              No hay controles registrados
            </Typography>
          </Box>
          ) : (
          <Grid container spacing={2}>
            {controls.map((evaluated) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evaluated.id}>
                <EvaluatedCard
                  evaluated={evaluated}
                  onDelete={handleDeleteEvaluated}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    
    

      {/* Botón flotante */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default EvaluatedScreen;