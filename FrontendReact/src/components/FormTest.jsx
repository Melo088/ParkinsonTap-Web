import React, { useState, useEffect } from 'react';
import { getEvaluatedData, saveTest } from '../services/testService';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AssignmentAdd } from "@mui/icons-material";


const FormTest = (props) => {
  const [evaluados, setEvaluados] = useState([]);
  const [selectedEvaluado, setSelectedEvaluado] = useState('');
  const [testName, setTestName] = useState('');
  const [side, setSide] = useState('');
  const [message, setMessage] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');


  useEffect(() => {
    // Llamar al servicio que obtiene los evaluados
    const fetchData = async () => {
      try {
        const data = await getEvaluatedData();
        setEvaluados(data);
      } catch (error) {
        console.error("Error fetching evaluated data:", error);
        setResponseMessage("Error al cargar los evaluados");
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);

    // Verificar si algún campo está vacío
    if (testName.trim() === '' || side === '' || message.trim() === '' || selectedEvaluado === '') {
      setResponseMessage('Por favor complete todos los campos obligatorios');
      return;
    }

    // Preparar los datos para la API
    const testData = {
      name: testName,
      description: message,
      evalAxis: side === 'izquierdo', // true para izq, false para derecha
      dateTime: new Date().toISOString().replace('Z', ''), // formato 2023-08-15T14:30:15.000
      evaluatedId: parseInt(selectedEvaluado), 
    };

    console.log("Sending test data:", testData);

    //solicitud a la API
    setLoading(true);
    setResponseMessage('');

    try {
      const result = await saveTest(testData);
      setLoading(false);

      if (result.error) {
        setResponseMessage(`Error: ${result.error}`);
      } else {
        setResponseMessage('Test guardado con éxito');
        
        if (result.testId) {
          if (props.onTestSaved) {
            props.onTestSaved(result.testId); // Llamar a la función de callback con el testId
          }
        }
        
        // resetear el formulario
        setTestName('');
        setSide('');
        setMessage('');
        setSelectedEvaluado('');
        setFormTouched(false);
      }
    } catch (error) {
      setLoading(false);
      setResponseMessage(`Error inesperado: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Formulario de Test</h2>
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
            <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}>
              Este campo es obligatorio
            </div>
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
            <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px', marginLeft: '14px' }}>
              Este campo es obligatorio
            </div>
          )}
        </FormControl>

        {/* Botón de Enviar */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AssignmentAdd />}
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {/* Mensaje de respuesta */}
      {responseMessage && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: responseMessage.includes('Error') ? '#ffebee' : '#e8f5e9',
          color: responseMessage.includes('Error') ? '#c62828' : '#2e7d32' 
        }}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default FormTest;