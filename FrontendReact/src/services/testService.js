const API_BASE_URL = "http://localhost:8080";

// Función para obtener los datos evaluados
export const getEvaluatedData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evaluated/data`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching evaluated data:", error);
    return [];
  }
};

export const searchEvaluatedByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/evaluated/search?name=${name}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching evaluated data by name:", error);
    return [];
  }
};

export const saveTest = async (testData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Error al guardar el test');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return { error: error.message };
  }
};