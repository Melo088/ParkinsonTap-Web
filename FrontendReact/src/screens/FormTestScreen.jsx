import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import FormTest from '../components/FormTest';
import { getEvaluatedData, saveTest } from '../services/testService';

const FormTestScreen = () => {
  const [evaluados, setEvaluados] = useState([]);
  const [selectedEvaluado, setSelectedEvaluado] = useState('');
  const [testName, setTestName] = useState('');
  const [side, setSide] = useState('');
  const [message, setMessage] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  
  const navigate = useNavigate();

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
          // Esperar un segundo para que el usuario vea el mensaje de éxito
          setTimeout(() => {
            navigate(`/acquisition/${result.testId}`);
          }, 1000);
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
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Nuevo Test
      </Typography>
      
      <FormTest 
        testName={testName}
        setTestName={setTestName}
        side={side}
        setSide={setSide}
        message={message}
        setMessage={setMessage}
        selectedEvaluado={selectedEvaluado}
        setSelectedEvaluado={setSelectedEvaluado}
        evaluados={evaluados}
        formTouched={formTouched}
        handleSubmit={handleSubmit}
        loading={loading}
        responseMessage={responseMessage}
      />
    </Box>
  );
};

export default FormTestScreen;