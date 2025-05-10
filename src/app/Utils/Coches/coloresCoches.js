// MAPEO DE COLORES A GRADIENTES
export const obtenerGradiente = (color) => {
  const gradientes = {
    rojo: {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #8B3A3A 100%)',
      acento: '#FF9999'
    },
    azul: {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #2c5282 100%)',
      acento: '#64B5F6'
    },
    negro: {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
      acento: '#757575'
    },
    blanco: {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #4A4A4A 100%)',
      acento: '#E0E0E0'
    },
    gris: {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #455A64 100%)',
      acento: '#90A4AE'
    }
  };

  // VALOR POR DEFECTO SI NO SE ENCUENTRA EL COLOR
  return gradientes[color.toLowerCase()] || {
    fondo: 'linear-gradient(135deg, #1a1a1a 0%, #2c5282 100%)',
    acento: '#64B5F6'
  };
}; 