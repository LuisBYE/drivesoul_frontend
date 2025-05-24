import React from 'react';
import '../styles/global.css';

const PageBanner = ({ title, subtitle, backgroundImage }) => {
  // Detectar si estamos en un dispositivo móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: isMobile ? '45vh' : '50vh', // Altura reducida
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    textAlign: 'center',
    position: 'relative',
    marginTop: '98px',
    width: '100%',
  };

  return (
    <div style={bannerStyle} className="page-banner">
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PageBanner;
