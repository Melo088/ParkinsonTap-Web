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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';

const EvaluatedForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    height: '',
    weight: '',
    notes: '',
    evaluatedType: '',
    gender: '',
    status: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const evaluatedTypes = [
    { id: 1, name: 'PACIENTES' },
    { id: 2, name: 'CONTROLES' }
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // form validation for json
      const transformedData = {
        name: formData.name,
        birthDate: formData.birth_date, 
        genreName: formData.gender, 
        height: parseFloat(formData.height), 
        weight: parseFloat(formData.weight), 
        notes: formData.notes,
        evaluatedTypeName: evaluatedTypes.find(type => type.id === formData.evaluatedType)?.name,
        status: formData.status
      };

      console.log('Sending data to backend:', transformedData); // Debug log

      await onSuccess(transformedData);
      
      // Reset form on success
      setFormData({
        name: '',
        birth_date: '',
        height: '',
        weight: '',
        notes: '',
        evaluatedType: '',
        gender: '',
        status: false
      });
      onClose();
    } catch (error) {
      console.error('Form submission error:', error); // Debug log
      setError(error.message || 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        birth_date: '',
        height: '',
        weight: '',
        notes: '',
        evaluatedType: '',
        gender: '',
        status: false
      });
      setError('');
      onClose();
    }
  };

  const selectedType = evaluatedTypes.find(type => type.id === formData.evaluatedType);
  const isPatient = selectedType?.name?.toLowerCase() === 'pacientes';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Evaluado</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Nombre Completo"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="birth_date"
            label="Fecha de Nacimiento"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Género</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Género"
              disabled={loading}
            >
              <MenuItem value="MASCULINO">Masculino</MenuItem>
              <MenuItem value="FEMENINO">Femenino</MenuItem>
              <MenuItem value="OTRO">Otro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Tipo de Evaluado</InputLabel>
            <Select
              name="evaluatedType"
              value={formData.evaluatedType}
              onChange={handleChange}
              label="Tipo de Evaluado"
              disabled={loading}
            >
              {evaluatedTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="height"
            label="Altura (cm)"
            type="number"
            value={formData.height}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ min: 0, step: 0.1 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="Peso (kg)"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ min: 0, step: 0.1 }}
          />

          {isPatient && (
            <FormControlLabel
              control={
                <Switch
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  disabled={loading}
                />
              }
              label="¿Está tomando medicamentos actualmente?"
              sx={{ mt: 2, mb: 1 }}
            />
          )}

          <TextField
            margin="normal"
            fullWidth
            name="notes"
            label="Notas adicionales"
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            disabled={loading}
            placeholder="Observaciones, comentarios adicionales..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Agregar Evaluado'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EvaluatedForm;