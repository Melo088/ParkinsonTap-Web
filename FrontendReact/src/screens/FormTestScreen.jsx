import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import FormTest from '../components/FormTest';
import { evaluatedService } from '../services/testService';

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
  const { evaluatedId } = useParams(); // Obtener el ID del evaluado desde la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await evaluatedService.getAllEvaluated();
        setEvaluados(data);
        
        // Si hay un evaluatedId en la URL, preseleccionar ese evaluado
        if (evaluatedId) {
          const evaluatedExists = data.find(evaluado => evaluado.id.toString() === evaluatedId);
          if (evaluatedExists) {
            setSelectedEvaluado(evaluatedId);
            // Opcional: prellenar el nombre del test con el nombre del evaluado
            setTestName(`Test - ${evaluatedExists.name}`);
          } else {
            setResponseMessage("El evaluado seleccionado no existe");
          }
        }
      } catch (error) {
        console.error("Error fetching evaluated data:", error);
        setResponseMessage("Error al cargar los evaluados");
      }
    };
    fetchData();
  }, [evaluatedId]);

  function getUserEmailFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload del token:', payload);
      return payload.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);

    if (testName.trim() === '' || side === '' || message.trim() === '' || selectedEvaluado === '') {
      setResponseMessage('Por favor complete todos los campos obligatorios');
      return;
    }

    const testData = {
      doctorEmail: getUserEmailFromToken(),
      name: testName,
      description: message,
      evalAxis: side === 'izquierdo',
      dateTime: new Date().toISOString().replace('Z', ''),
      evaluatedId: parseInt(selectedEvaluado),
    };

    setLoading(true);
    setResponseMessage('');

    try {
      console.log("Datos a enviar:", testData);
      const result = await evaluatedService.saveTest(testData);
      setLoading(false);

      if (result.error) {
        setResponseMessage(`Error: ${result.error}`);
      } else {
        setResponseMessage('Test guardado con éxito');
        if (result.testId) {
          setTimeout(() => {
            navigate(`/acquisition/${result.testId}`);
          }, 1000);
        }
        
        // Limpiar formulario
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
        // Pasar información adicional para indicar si viene de un evaluado específico
        preselectedEvaluated={evaluatedId}
      />
    </Box>
  );
};

export default FormTestScreen;