import { authService } from "./authService";

export const evaluatedService = {
  // Obtener todos los evaluados 
  getAllEvaluated: async () => {
    try {
      const response = await authService.fetchWithAuth('/evaluated/data', {
        method: 'GET'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener evaluados');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching evaluated data:", error);
      return [];
    }
  },

  // Buscar evaluado por nombre
  searchByName: async (name) => {
    try {
      const response = await authService.fetchWithAuth(`/evaluated/search?name=${name}`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al buscar evaluado');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching evaluated data by name:", error);
      return [];
    }
  },

  // Guardar un test
  saveTest: async (testData) => {
    try {
      const response = await authService.fetchWithAuth('/test/save', {
        method: 'POST',
        body: JSON.stringify(testData),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al guardar el test');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error al guardar test:", error);
      return { error: error.message };
    }
  },


  // Borrar un test 
  deleteTest: async (testId) => {
    try {
      const response = await authService.fetchWithAuth(`/test/delete/${testId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error al eliminar el test');
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar test:", error);
      return { error: error.message };
    }
  },

  // Obtener todos los tests
  getAllTests: async () => {
    try {
      const response = await authService.fetchWithAuth('/test/all', {
        method: 'GET'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener tests');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching all tests:", error);
      return [];
    }
  },

  // Obtener un test por ID
getTestById: async (testId) => {
    try {
      const response = await authService.fetchWithAuth(`/test/${testId}`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el test');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching test by ID:", error);
      return null;
    }
  }

};