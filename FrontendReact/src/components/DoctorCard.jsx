import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import { Delete as DeleteIcon, Person as PersonIcon } from '@mui/icons-material';


const DoctorCard = ({ doctor, onDelete }) => {
  console.log("DoctorCard props:", doctor);
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al Dr. ${doctor.firstName} ${doctor.lastName}?`)) {
      onDelete(doctor.id);
    }
  };

  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div">
            Dr. {doctor.firstName} {doctor.lastName}
          </Typography>
        </Box>
        
        <Typography color="text.secondary" gutterBottom>
          <strong>Email:</strong> {doctor.email}
        </Typography>
        
        <Typography color="text.secondary" gutterBottom>
          <strong>Especialidad:</strong> {doctor.speciality || 'No especificada'}
        </Typography>
        
        <Typography color="text.secondary" gutterBottom>
          <strong>Centro Médico:</strong> {doctor.medicalCenter || 'No especificado'}
        </Typography>
        
        <Box mt={2}>
          <Chip 
            label={doctor.role?.roleName || 'DOCTOR'} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;