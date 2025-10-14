import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { authService } from '../services/authService';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  const isLoginPage = location.pathname === '/login';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    handleClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Parkinson Tap
          </Typography>

          {isAuthenticated && !isLoginPage ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 2 }}>
                {userRole === 'ADMIN' ? 'Administrador' : 'Doctor'}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userRole === 'ADMIN' && (
                  <MenuItem onClick={() => handleNavigation('/admin')}>
                    Panel Admin
                  </MenuItem>
                )}
                {userRole === 'DOCTOR' && (
                  <MenuItem onClick={() => handleNavigation('/doctor')}>
                    Panel Doctor
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </Box>
          ) : !isLoginPage && (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
