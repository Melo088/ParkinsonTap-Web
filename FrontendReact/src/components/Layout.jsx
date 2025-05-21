import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Evaluación Parkinson
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography 
              component={Link} 
              to="/" 
              sx={{ color: 'white', textDecoration: 'none' }}
            >
              Inicio
            </Typography>
            <Typography 
              component={Link} 
              to="/form" 
              sx={{ color: 'white', textDecoration: 'none' }}
            >
              Nuevo Test
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;