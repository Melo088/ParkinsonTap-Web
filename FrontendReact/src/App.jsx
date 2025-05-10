import React, { useState } from 'react';
import './App.css';
import DataAcquisitionButton from './components/DataAcquisitionButton';
import FormTest from './components/FormTest';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' o 'acquisition'
  const [currentTestId, setCurrentTestId] = useState(null);
  
  const handleTestSaved = (testId) => {
    setCurrentTestId(testId);
    setCurrentView('acquisition');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Evaluación Parkinson</h1>
      </header>
      <main>
        {currentView === 'form' ? (
          <FormTest onTestSaved={handleTestSaved} />
        ) : (
          <DataAcquisitionButton testId={currentTestId} />
        )}
      </main>
    </div>
  );
}

export default App;