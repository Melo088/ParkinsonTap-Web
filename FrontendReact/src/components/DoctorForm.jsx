import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

const DoctorForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    speciality: '',
    medicalCenter: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // error general (server o submit)
  const [fieldErrors, setFieldErrors] = useState({}); // errores por campo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setFieldErrors((prev) => ({
      ...prev,
      [name]: false
    }));
  };

  const validateFields = () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = true;
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Por favor completa todos los campos.');
      return; // no continuar si hay errores
    }

    setLoading(true);
    try {
      await onSuccess(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
        medicalCenter: ''
      });
      setFieldErrors({});
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
        medicalCenter: ''
      });
      setError('');
      setFieldErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Doctor</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            name="firstName"
            label="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.firstName}
            helperText={fieldErrors.firstName ? 'El nombre es obligatorio' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.lastName}
            helperText={fieldErrors.lastName ? 'El apellido es obligatorio' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email ? 'El email es obligatorio' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password ? 'La contraseña es obligatoria' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="speciality"
            label="Especialidad"
            value={formData.speciality}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.speciality}
            helperText={fieldErrors.speciality ? 'La especialidad es obligatoria' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="medicalCenter"
            label="Centro Médico"
            value={formData.medicalCenter}
            onChange={handleChange}
            disabled={loading}
            error={!!fieldErrors.medicalCenter}
            helperText={fieldErrors.medicalCenter ? 'El centro médico es obligatorio' : ''}
          />

          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Agregar Doctor'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorForm;
