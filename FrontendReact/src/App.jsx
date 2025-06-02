import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// Screens
import HomeScreen from './screens/HomeScreen';
import FormTestScreen from './screens/FormTestScreen';
import DataAcquisitionScreen from './screens/DataAcquisitionScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import UnauthorizedScreen from './screens/UnauthorizedScreen';
import EvaluatedScreen from './screens/EvaluatedScreen';
import GraphScreen from './screens/GraphScreen';
import TestsScreen from './screens/TestsScreen';


// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
// Services
import { authService } from './services/authService';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const RoleBasedRedirect = () => {
  const userRole = authService.getUserRole();
  if (userRole === 'ADMIN') return <Navigate to="/admin" replace />;
  if (userRole === 'DOCTOR') return <Navigate to="/doctor" replace />;
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/unauthorized" element={<UnauthorizedScreen />} />
          <Route path="/grafica" element={<GraphScreen />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={<ProtectedRoute />}>
            {/* Rutas con layout */}
            <Route element={<Layout />}>
              <Route index element={
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                  <RoleBasedRedirect />
                </Container>
              } />
              <Route path="home" element={
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                  <HomeScreen />
                </Container>
              } />
              
              {/* Rutas protegidas solo para DOCTOR */}
              <Route element={<ProtectedRoute requiredRole="DOCTOR" />}>
                {/* Ruta para formulario general (mantenemos por compatibilidad) */}
                <Route path="form" element={
                  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <FormTestScreen />
                  </Container>
                } />
                
                {/* Nueva ruta para formulario con evaluado preseleccionado */}
                <Route path="test/:evaluatedId" element={
                  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <FormTestScreen />
                  </Container>
                } />
                
                <Route path="acquisition/:testId" element={
                  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <DataAcquisitionScreen />
                  </Container>
                } />
                <Route path="tests" element={
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <TestsScreen />
                </Container>
              } />
              </Route>
            </Route>
            
            {/* Rutas protegidas específicas por rol (fuera del layout principal) */}
            <Route path="admin" element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route index element={<AdminScreen />} />
            </Route>
            <Route path="doctor" element={<ProtectedRoute requiredRole="DOCTOR" />}>
              <Route index element={<EvaluatedScreen />} />
            </Route>
          </Route>
          
          {/* Ruta comodín */}
          <Route
            path="*"
            element={
              authService.isAuthenticated() && !authService.isTokenExpired()
                ? <Navigate to="/" replace />
                : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;