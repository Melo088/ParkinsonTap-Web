import React from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fade,
  Slide
} from '@mui/material';
import { 
  AssignmentAdd,
  Assignment,
  Psychology,
  Description,
  Person
} from "@mui/icons-material";

const FormTest = ({
  testName,
  setTestName,
  side,
  setSide,
  message,
  setMessage,
  selectedEvaluado,
  setSelectedEvaluado,
  evaluados,
  formTouched,
  handleSubmit,
  loading,
  responseMessage
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.02)} 0%, 
          ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        py: 4
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
        {/* Header Card */}
        <Fade in timeout={600}>
          <Card
            elevation={0}
            sx={{
              mb: 4,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.primary.dark})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Assignment sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h4" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 0.5
                    }}
                  >
                    Crear Nuevo Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete la información requerida para generar el test
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Response Message */}
        {responseMessage && (
          <Slide direction="down" in={Boolean(responseMessage)} timeout={300}>
            <Box sx={{ mb: 3 }}>
              <Alert 
                severity={responseMessage.includes('Error') ? 'error' : 'success'}
                sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${alpha(
                    responseMessage.includes('Error') ? theme.palette.error.main : theme.palette.success.main, 
                    0.2
                  )}`
                }}
              >
                {responseMessage}
              </Alert>
            </Box>
          </Slide>
        )}

        {/* Form Card */}
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Nombre del Test */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Psychology sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                        Nombre del Test
                      </Typography>
                    </Box>
                    <TextField
                      label="Ingrese el nombre del test"
                      variant="outlined"
                      fullWidth
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      error={formTouched && testName.trim() === ''}
                      helperText={formTouched && testName.trim() === '' ? 'Este campo es obligatorio' : ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)'
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 1)'
                          }
                        }
                      }}
                    />
                  </Box>

                  {/* Lado del cuerpo */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Assignment sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                        Lado del Cuerpo
                      </Typography>
                    </Box>
                    <FormControl 
                      fullWidth 
                      error={formTouched && side === ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)'
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 1)'
                          }
                        }
                      }}
                    >
                      <InputLabel>Seleccione un lado</InputLabel>
                      <Select
                        value={side}
                        onChange={(e) => setSide(e.target.value)}
                        label="Seleccione un lado"
                      >
                        <MenuItem value="">Seleccione un lado</MenuItem>
                        <MenuItem value="izquierdo">Izquierdo</MenuItem>
                        <MenuItem value="derecho">Derecho</MenuItem>
                      </Select>
                      {formTouched && side === '' && (
                        <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                          Este campo es obligatorio
                        </Typography>
                      )}
                    </FormControl>
                  </Box>

                  {/* Descripción */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Description sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                        Descripción
                      </Typography>
                    </Box>
                    <TextField
                      label="Descripción detallada del test"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={formTouched && message.trim() === ''}
                      helperText={formTouched && message.trim() === '' ? 'Este campo es obligatorio' : ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)'
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 1)'
                          }
                        }
                      }}
                    />
                  </Box>

                  {/* Evaluado */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Person sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                        Evaluado
                      </Typography>
                    </Box>
                    <FormControl 
                      fullWidth 
                      error={formTouched && selectedEvaluado === ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)'
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 1)'
                          }
                        }
                      }}
                    >
                      <InputLabel>Evaluado</InputLabel>
                      <Select
                        value={selectedEvaluado}
                        onChange={(e) => setSelectedEvaluado(e.target.value)}
                        label="Evaluado"
                      >
                        <MenuItem value="">Seleccione un Evaluado</MenuItem>
                        {evaluados && evaluados.length > 0 ? (
                          evaluados.map((evaluado) => (
                            <MenuItem key={evaluado.id} value={evaluado.id}>
                              {/* Usar la misma propiedad que en EvaluatedCard */}
                              {evaluado.name || evaluado.nombre || `ID: ${evaluado.id}`}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No hay evaluados disponibles</MenuItem>
                        )}
                      </Select>
                      {formTouched && selectedEvaluado === '' && (
                        <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                          Este campo es obligatorio
                        </Typography>
                      )}
                    </FormControl>
                  </Box>

                  {/* Botón de Enviar */}
                  <Box sx={{ pt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AssignmentAdd />}
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}, 
                          ${theme.palette.primary.dark})`,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          background: `linear-gradient(135deg, 
                            ${theme.palette.primary.dark}, 
                            ${theme.palette.primary.main})`,
                          boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                          transform: 'translateY(-1px)'
                        },
                        '&:disabled': {
                          background: alpha(theme.palette.action.disabled, 0.12),
                          color: theme.palette.action.disabled
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {loading ? 'Enviando...' : 'Crear Test'}
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Box>
  );
};

export default FormTest;