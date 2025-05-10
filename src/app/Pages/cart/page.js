'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import { useCart } from '../../context/CartContext';
import './cart.css';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('user'));
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Función para obtener la imagen principal del coche
  // Función para obtener la imagen principal del coche
  const getImagenCoche = (modelo_id) => {
    // Mapa simplificado de imágenes por modelo
    const rutasImagenes = {
      1: '/FOTOS/COCHES/SEATIBIZAROJO/1.jpg',
      2: '/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png',
      90: '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
      91: '/FOTOS/COCHES/SEATARONAAZUL/1.png'
    };
    
    return rutasImagenes[modelo_id] || '/FOTOS/COCHES/default.jpg';
  };

  // Función para ir al catálogo
  const continuarComprando = () => {
    router.push('/Pages/Catalogo');
  };

  // Función para procesar el pedido
  const procesarPedido = () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulamos un proceso de pedido
    setTimeout(() => {
      alert('¡Pedido realizado con éxito! Un asesor se pondrá en contacto contigo para finalizar la compra.');
      clearCart();
      setIsProcessing(false);
      router.push('/');
    }, 1000);
  };

  // Función para manejar cambios en la cantidad
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-page">
      <NavegadorMenu />
      
      <div className="cart-container">
        <h1 className="cart-title">Mi Carrito</h1>
        
        {!isLoggedIn && (
          <div className="login-required">
            <i className="fas fa-user-lock login-icon"></i>
            <h2>Inicia sesión para continuar</h2>
            <p>Para acceder a tu carrito y realizar compras, es necesario iniciar sesión</p>
            <button onClick={() => router.push('/Pages/Registro')} className="btn-login">
              Iniciar sesión / Registrarse
            </button>
          </div>
        )}
        
        {isLoggedIn && cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <p>Tu carrito está vacío</p>
            <button onClick={continuarComprando} className="btn-continuar">
              Explorar catálogo
            </button>
          </div>
        ) : (isLoggedIn && cartItems.length > 0) && (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={getImagenCoche(item.modelo_id)} 
                      alt={item.nombre} 
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.nombre}</h3>
                    <div className="item-specs">
                      <span><i className="fas fa-calendar-alt"></i> {item.anio}</span>
                      <span><i className="fas fa-gas-pump"></i> {item.tipo_combustible}</span>
                      <span><i className="fas fa-palette"></i> {item.color}</span>
                    </div>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  
                  <div className="item-price">
                    {(item.precio * item.quantity).toLocaleString('es-ES')} €
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    aria-label="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{cartTotal.toLocaleString('es-ES')} €</span>
              </div>
              <div className="summary-row">
                <span>IVA (21%):</span>
                <span>{(cartTotal * 0.21).toLocaleString('es-ES')} €</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{(cartTotal * 1.21).toLocaleString('es-ES')} €</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  onClick={continuarComprando}
                  className="btn-continuar"
                >
                  Seguir comprando
                </button>
                <button 
                  onClick={procesarPedido}
                  className="btn-procesar"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Procesando...' : 'Finalizar compra'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
