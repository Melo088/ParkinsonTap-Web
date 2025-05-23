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
  }
};