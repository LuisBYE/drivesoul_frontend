'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './estadoCompra.css';
import NavegadorPag from "../../component/Pages/Menu/Navegador";

export default function EstadoCompraPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Obtener datos del usuario del localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.nombre);
    }

    // Generar número de pedido aleatorio
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderNumber.toString());

    // Limpiar el carrito
    localStorage.removeItem('carrito');

    // Redirigir a la página principal si se recarga
    const handleBeforeUnload = () => {
      router.push('/');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router]);

  return (
    <>
      <NavegadorPag />
      <div className="estado-compra-container">
        <div className="estado-compra-content">
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark-stem"></div>
              <div className="checkmark-kick"></div>
            </div>
          </div>

          <h1>¡Gracias por tu compra{userName ? ', ' + userName : ''}!</h1>
          
          <div className="order-info">
            <div className="order-number">
              <span className="label">Número de Pedido:</span>
              <span className="value">#{orderNumber}</span>
            </div>
            <p className="confirmation-text">
              Hemos recibido tu pedido correctamente y está siendo procesado.
            </p>
          </div>

          <div className="notification-box">
            <div className="notification-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div className="notification-content">
              <h3>Confirmación enviada</h3>
              <p>Te hemos enviado un correo electrónico con los detalles de tu compra.</p>
            </div>
          </div>

          <div className="next-steps">
            <h2>¿Qué sucede ahora?</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Confirmación</h3>
                <p>Recibirás un correo con el resumen de tu pedido</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Preparación</h3>
                <p>Prepararemos tu pedido para el envío</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Envío</h3>
                <p>Te notificaremos cuando tu pedido esté en camino</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link href="/Pages/Perfil" className="view-orders-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-3.97 2.76-7.13 6.44-7.93v-2.02c-4.89.64-8.44 4.94-8.44 9.95 0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.11-3.55-9.41-8.44-9.95zm-1 4.95c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              Ver mis pedidos
            </Link>
            <Link href="/Pages/Catalogo" className="continue-shopping-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"/>
              </svg>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}