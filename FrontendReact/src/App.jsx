import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Screens
import HomeScreen from './screens/HomeScreen';
import FormTestScreen from './screens/FormTestScreen';
import DataAcquisitionScreen from './screens/DataAcquisitionScreen';

// Layout
import Layout from './components/Layout';

// Estilos
import './App.css';

// Tema de Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/form" element={<FormTestScreen />} />
              <Route path="/acquisition/:testId" element={<DataAcquisitionScreen />} />
            </Routes>
          </Container>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;