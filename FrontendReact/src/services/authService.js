const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('token');

// Encabezados comunes con token
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error en el login');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = getToken();
    return !!token;
  },

  // Obtener el rol del usuario
  getUserRole: () => {
    return localStorage.getItem('userRole');
  },

  // Verificar si el token ha expirado
  isTokenExpired: () => {
    const token = getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },

  // Guardar token y extraer información
  setToken: (token) => {
    localStorage.setItem('token', token);

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.roles;
      localStorage.setItem('userRole', roles);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  },

  // Verificar si el usuario tiene un rol específico
  hasRole: (role) => {
    const userRole = localStorage.getItem('userRole');
    return userRole === role;
  },

  // Hacer una solicitud autenticada con fetch
  fetchWithAuth: async (url, options = {}) => {
    const headers = {
      ...options.headers,
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }

    return response;
  }
};
