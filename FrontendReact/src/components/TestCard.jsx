// Opción adicional: Modificar TestCard para mostrar/ocultar el botón de eliminar
// basado en si el doctor actual es el creador del test

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  LocalHospital,
  HealthAndSafety,
  Analytics as AnalyticsIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test, onDelete, currentDoctorEmail }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el test "${test.name}"?`)) {
      onDelete(test.id);
    }
  };

  const handleAddMeasurements = () => {
    navigate(`/acquisition/${test.id}`);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return dateString;
    }
  };

  const getEvaluatedTypeColor = (typeName) => {
    if (typeName?.toLowerCase() === 'pacientes') {
      return {
        color: theme.palette.error.main,
        icon: <LocalHospital sx={{ fontSize: 16 }} />
      };
    } else if (typeName?.toLowerCase() === 'controles') {
      return {
        color: theme.palette.success.main,
        icon: <HealthAndSafety sx={{ fontSize: 16 }} />
      };
    }
    return {
      color: theme.palette.primary.main,
      icon: <PersonIcon sx={{ fontSize: 16 }} />
    };
  };

  const evaluatedTypeStyle = getEvaluatedTypeColor(test.evaluated?.evaluatedTypeName);

  // Verificar si el doctor actual puede eliminar este test
  const canDelete = !test.doctorEmail || currentDoctorEmail === test.doctorEmail;

  return (
    <Card
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header del test */}
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.primary.dark})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            <AssessmentIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Box flex={1}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 0.5
              }}
            >
              {test.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Test ID: #{test.testId}
            </Typography>
          </Box>
        </Box>

        {/* Descripción */}
        {test.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, lineHeight: 1.5 }}
          >
            {test.description}
          </Typography>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Información del evaluado */}
        <Box mb={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                background: `linear-gradient(135deg, 
                  ${evaluatedTypeStyle.color}, 
                  ${alpha(evaluatedTypeStyle.color, 0.8)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5
              }}
            >
              {React.cloneElement(evaluatedTypeStyle.icon, { 
                sx: { color: 'white', fontSize: 14 } 
              })}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Evaluado
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            {test.evaluated?.firstName} {test.evaluated?.lastName}
          </Typography>
          <Box sx={{ ml: 4, mt: 0.5 }}>
            <Chip
              label={test.evaluatedTypeName || 'Sin clasificar'}
              size="small"
              sx={{
                backgroundColor: alpha(evaluatedTypeStyle.color, 0.1),
                color: evaluatedTypeStyle.color,
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            />
          </Box>
        </Box>

        {/* Información del doctor */}
        <Box mb={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <PersonIcon sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Doctor
            </Typography>
            {/* Indicador visual si es el doctor actual */}
            {canDelete && (
              <Chip
                label="Tú"
                size="small"
                color="primary"
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            Dr. {test.doctorFirstName} {test.doctorLastName}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
            {test.doctorEmail}
          </Typography>
        </Box>

        {/* Fecha y hora */}
        <Box mb={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <DateIcon sx={{ color: theme.palette.secondary.main, mr: 1.5, fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Fecha de Creación
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            {formatDate(test.dateTime)}
          </Typography>
        </Box>

        {/* Configuración del test */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Configuración
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip
              label={test.evalAxis ? 'Con evaluación de ejes' : 'Sin evaluación de ejes'}
              size="small"
              variant="outlined"
              color={test.evalAxis ? 'success' : 'default'}
            />
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AnalyticsIcon />}
          onClick={handleAddMeasurements}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            flex: 1,
            background: `linear-gradient(135deg, 
              ${theme.palette.secondary.main}, 
              ${theme.palette.secondary.dark})`,
            '&:hover': {
              background: `linear-gradient(135deg, 
                ${theme.palette.secondary.dark}, 
                ${theme.palette.secondary.main})`
            }
          }}
        >
          Tomar Medidas
        </Button>
        
        {/* Solo mostrar el botón de eliminar si el doctor actual puede eliminarlo */}
        {canDelete ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: alpha(theme.palette.error.main, 0.3),
              '&:hover': {
                borderColor: theme.palette.error.main,
                background: alpha(theme.palette.error.main, 0.04)
              }
            }}
          >
            Eliminar
          </Button>
        ) : (
 <Box
 sx={{
   borderRadius: 2,
   flex: 1,
   background: `linear-gradient(135deg,
     ${theme.palette.secondary.main},
     ${theme.palette.secondary.dark})`,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: 1,
   minHeight: '34px', 
 }}
>
 <WarningIcon sx={{ width: '25px', fontSize: 16, color: 'white' }} />
 <Typography 
   variant="body2" 
   sx={{ 
     fontWeight: 600,
     color: 'white',
     fontSize: '0.7rem'
     
   }}
 >
   Solo el creador puede eliminarlo
 </Typography>
</Box>
        )}
      </CardActions>
    </Card>
  );
};

export default TestCard;