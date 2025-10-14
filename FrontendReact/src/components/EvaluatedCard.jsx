import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  Collapse,
  Divider
} from "@mui/material";
import { 
  Delete as DeleteIcon, 
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Medication as MedicationIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const EvaluatedCard = ({ evaluated, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar la evaluación de ${evaluated.name}?`
      )
    ) {
      onDelete(evaluated.id);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCreateTest = (e) => {
    e.stopPropagation(); // Evitar que se expanda al hacer click en crear test
    // Navegar al formulario de test con el ID del evaluado
    navigate(`/test/${evaluated.id}`);
  };

  // Función para calcular la edad
  const calculateAge = (birthDate) => {
    if (!birthDate) return "No especificada";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Función para obtener el icono del género
  const getGenderIcon = () => {
    if (!evaluated.genreName) return null;
    const genreName = evaluated.genreName.toLowerCase();
    if (genreName === 'masculino') {
      return <MaleIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
    } else if (genreName === 'femenino') {
      return <FemaleIcon sx={{ fontSize: 16, color: '#d81b60' }} />;
    } 
  };

  // Función para obtener el color del chip según el tipo
  const getTypeChipColor = () => {
    if (!evaluated.evaluatedTypeName) return "default";
    const typeName = evaluated.evaluatedTypeName.toLowerCase();
    return typeName === 'pacientes' ? "error" : "success";
  };

  // Función para determinar si es paciente
  const isPatient = () => {
    if (!evaluated.evaluatedTypeName) return false;
    return evaluated.evaluatedTypeName.toLowerCase() === 'pacientes';
  };

  return (
    <Card sx={{ minWidth: 275, m: 1, cursor: 'pointer' }}>
      <CardContent onClick={handleExpandClick}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" component="div">
              {evaluated.name || "Sin nombre"}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {getGenderIcon()}
            <Chip 
              label={evaluated.evaluatedTypeName || "Sin tipo"} 
              size="small"
              color={getTypeChipColor()}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Edad:</strong> {calculateAge(evaluated.birthDate)} años
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Género:</strong> {evaluated.genreName || "No especificado"}
          </Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Altura:</strong> {evaluated.height ? `${evaluated.height} cm` : "No especificada"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Peso:</strong> {evaluated.weight ? `${evaluated.weight} kg` : "No especificado"}
          </Typography>
        </Box>

        {/* Mostrar estado de medicamento solo para pacientes */}
        {isPatient() && (
          <Box display="flex" alignItems="center" mt={1} mb={1}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              <strong>Medicamento:</strong>
            </Typography>
            <Box display="flex" alignItems="center">
              {evaluated.status ? (
                <>
                  <MedicationIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  <Chip 
                    label="Tomando medicamento" 
                    size="small" 
                    color="success" 
                    variant="filled"
                  />
                </>
              ) : (
                <>
                  <MedicationIcon sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                  <Chip 
                    label="Sin medicamento" 
                    size="small" 
                    color="error" 
                    variant="filled"
                  />
                </>
              )}
            </Box>
          </Box>
        )}

        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {expanded ? "Ocultar notas" : "Ver notas"}
          </Typography>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
      </CardContent>

      {/* Sección expandible para notas */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Notas:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
            {evaluated.notes || "Sin notas registradas"}
          </Typography>
        </CardContent>
      </Collapse>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AssessmentIcon />}
          onClick={handleCreateTest}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 2
          }}
        >
          Crear Test
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que se expanda al hacer click en eliminar
            handleDelete();
          }}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default EvaluatedCard;