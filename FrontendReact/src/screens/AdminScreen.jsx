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
import { doctorService } from '../services/doctorService';
import DoctorCard from '../components/DoctorCard';
import DoctorForm from '../components/DoctorForm';
import Grid from '@mui/material/Grid';

console.log('AdminScreen loaded');

const AdminScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);

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
    await doctorService.registerDoctor(doctorData);
    await loadDoctors(); // Recargar la lista
    setError('');
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await doctorService.deleteDoctor(doctorId);
      await loadDoctors(); // Recargar la lista
      setError('');
    } catch (error) {
      setError('Error al eliminar doctor: ' + error.message);
    }
  };

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
          Panel de Administración
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Agregar Doctor
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h5" component="h2" gutterBottom>
        Doctores Registrados ({doctors.length})
      </Typography>

      {doctors.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            No hay doctores registrados
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {doctors.map((doctor) => (
            <Grid size={{ xs: 12, sm: 6, md : 4 }} key={doctor.id}>
              <DoctorCard
                doctor={doctor}
                onDelete={handleDeleteDoctor}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <DoctorForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleAddDoctor}
      />

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

export default AdminScreen;