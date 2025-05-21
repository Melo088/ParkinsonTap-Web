import React from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Paper,
  Typography,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { AssignmentAdd } from "@mui/icons-material";

const FormTest = ({ 
  testName, 
  setTestName, 
  side, 
  setSide, 
  message, 
  setMessage, 
  selectedEvaluado, 
  setSelectedEvaluado, 
  evaluados, 
  formTouched,
  handleSubmit,
  loading,
  responseMessage
}) => {
  
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Formulario de Test
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Nombre del Test */}
        <TextField
          label="Nombre del Test"
          variant="outlined"
          fullWidth
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          margin="normal"
          error={formTouched && testName.trim() === ''}
          helperText={formTouched && testName.trim() === '' ? 'Este campo es obligatorio' : ''}
        />

        {/* Lado del cuerpo */}
        <FormControl fullWidth margin="normal" error={formTouched && side === ''}>
          <InputLabel>Seleccione un lado</InputLabel>
          <Select
            value={side}
            onChange={(e) => setSide(e.target.value)}
            label="Seleccione un lado"
          >
            <MenuItem value="">Seleccione un lado</MenuItem>
            <MenuItem value="izquierdo">Izquierdo</MenuItem>
            <MenuItem value="derecho">Derecho</MenuItem>
          </Select>
          {formTouched && side === '' && (
            <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
              Este campo es obligatorio
            </Typography>
          )}
        </FormControl>

        {/* Descripción */}
        <TextField
          label="Descripción"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
          error={formTouched && message.trim() === ''}
          helperText={formTouched && message.trim() === '' ? 'Este campo es obligatorio' : ''}
        />

        {/* Evaluado */}
        <FormControl fullWidth margin="normal" error={formTouched && selectedEvaluado === ''}>
          <InputLabel>Evaluado</InputLabel>
          <Select
            value={selectedEvaluado}
            onChange={(e) => setSelectedEvaluado(e.target.value)}
            label="Evaluado"
          >
            <MenuItem value="">Seleccione un Evaluado</MenuItem>
            {evaluados.map((evaluado) => (
              <MenuItem key={evaluado.id} value={evaluado.id}>
                {evaluado.name}
              </MenuItem>
            ))}
          </Select>
          {formTouched && selectedEvaluado === '' && (
            <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
              Este campo es obligatorio
            </Typography>
          )}
        </FormControl>

        {/* Botón de Enviar */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AssignmentAdd />}
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {/* Mensaje de respuesta */}
      {responseMessage && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={responseMessage.includes('Error') ? 'error' : 'success'}>
            {responseMessage}
          </Alert>
        </Box>
      )}
    </Paper>
  );
};

export default FormTest;