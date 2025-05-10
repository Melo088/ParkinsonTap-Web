import React, { useEffect, useState } from 'react';
import { connectMQTT, sendStartMessage } from '../services/dataAcquisitionService';

function DataAcquisitionButton(props) {
  const { testId } = props;
  
  useEffect(() => {
    connectMQTT();
  }, []);
  
  const startTest = () => {
    sendStartMessage(testId);
  };

  return (
    <div>
      <h2>Toma de datos</h2>
      <p>Puede iniciar la toma de datos <b>pulsando el botón</b></p>
      {testId && <p>ID del test: {testId}</p>}
      <button onClick={startTest}>Iniciar Prueba</button>
    </div>
  );
}

export default DataAcquisitionButton;