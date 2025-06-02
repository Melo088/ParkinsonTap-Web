export const fetchSimulatedData = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/reading/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // parsea el JSON
    return data;
  } catch (error) {
    console.error('Error al obtener los datos simulados:', error);
    return [];
  }
};
