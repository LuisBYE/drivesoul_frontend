"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./orderConfirmation.css";

export default function OrderConfirmation() {
  const router = useRouter();
  const [countdown, setCountdown] = React.useState(3);

  // Redirigir a la página principal despues de 3 segundos
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="order-confirmation-container">
      <div className="order-confirmation-card">
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        
        <div className="confirmation-header">
          <h1>¡Pedido Realizado con Éxito!</h1>
          <div className="checkmark-animation">✔</div>
        </div>
        
        <p className="confirmation-message">
          Tu pedido ha sido procesado correctamente y está en camino.
          <span className="thank-you">Gracias por confiar en DriveSoul.</span>
        </p>
        
        <div className="order-details">
          <div className="detail-item">
            <i className="fas fa-envelope"></i>
            <p>Recibirás un correo electrónico con los detalles de tu compra</p>
          </div>
          <div className="detail-item">
            <i className="fas fa-truck"></i>
            <p>Tu pedido será procesado en las próximas 24 horas</p>
          </div>
        </div>
        
        <div className="redirect-message">
          <p>Redirigiendo a la página principal en <span className="countdown">{countdown}</span> segundos</p>
        </div>
        
        <div className="loader">
          <div className="loader-bar"></div>
        </div>
        
        <button 
          className="home-button"
          onClick={() => router.push('/')}
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}
