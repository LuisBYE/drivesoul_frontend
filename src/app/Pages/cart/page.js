'use client';

/* PÁGINA DEL CARRITO DE COMPRAS
 * ESTA PÁGINA MUESTRA LOS PRODUCTOS AÑADIDOS AL CARRITO
 * PERMITE GESTIONAR CANTIDADES, ELIMINAR PRODUCTOS Y FINALIZAR LA COMPRA
 */

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
  
  // VERIFICAR AUTENTICACIÓN DEL USUARIO
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener('login', checkAuth);
    window.addEventListener('logout', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('login', checkAuth);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);

  /* FUNCIÓN PARA OBTENER LA IMAGEN DEL COCHE
   * DEVUELVE LA RUTA DE LA IMAGEN PRINCIPAL DEL COCHE SEGÚN SU MODELO_ID
   * SI NO ENCUENTRA LA IMAGEN, DEVUELVE UNA IMAGEN POR DEFECTO
   */
  const getImagenCoche = (modelo_id) => {
    // MAPA DE IMÁGENES POR MODELO
    const rutasImagenes = {
      1: '/FOTOS/COCHES/SEATIBIZAROJO/1.jpg',
      2: '/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png',
      3: '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
      4: '/FOTOS/COCHES/SEATARONAAZUL/1.png',
      90: '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
      91: '/FOTOS/COCHES/SEATARONAAZUL/1.png'
    };
    
    // DEVOLVER IMAGEN SEGÚN MODELO_ID O IMAGEN POR DEFECTO
    return rutasImagenes[modelo_id] || '/FOTOS/COCHES/default.jpg';
  };

  /* FUNCIÓN PARA CONTINUAR COMPRANDO
   * REDIRIGE AL USUARIO AL CATÁLOGO DE PRODUCTOS
   */
  const continuarComprando = () => {
    router.push('/Pages/Catalogo');
  };

  /* FUNCIÓN PARA PROCESAR EL PEDIDO
   * ESTA FUNCIÓN SE ENCARGA DE FINALIZAR LA COMPRA
   * EN EL FUTURO AQUÍ SE HARÁ LA LLAMADA AL BACKEND
   * 
   * BACKEND TODO:
   * 1. CREAR ENDPOINT PARA GUARDAR PEDIDO EN BASE DE DATOS
   * 2. ENVIAR DATOS DEL CARRITO (cartItems) AL BACKEND
   * 3. PROCESAR PAGO Y CONFIRMACIÓN
   */
  const procesarPedido = () => {
    // VERIFICAR SI HAY PRODUCTOS
    if (cartItems.length === 0) {
      return;
    }
    
    // VERIFICAR AUTENTICACIÓN
    if (!isLoggedIn) {
      router.push('/Pages/Registro');
      return;
    }
    
    // MOSTRAR MENSAJE DE PROCESAMIENTO
    setIsProcessing(true);
    
    // SIMULAR PROCESO DE PEDIDO
    // AQUÍ ES DONDE SE HARÁ LA LLAMADA AL BACKEND EN EL FUTURO
    setTimeout(() => {
      // LIMPIAR CARRITO
      clearCart();
      
      // FINALIZAR PROCESAMIENTO
      setIsProcessing(false);
      
      // REDIRIGIR A INICIO
      router.push('/');
    }, 1000);
  };

  /* FUNCIÓN PARA ACTUALIZAR CANTIDAD
   * UTILIZA LA FUNCIÓN updateQuantity DEL CONTEXTO
   * PERMITE AUMENTAR O DISMINUIR LA CANTIDAD DE UN PRODUCTO
   * 
   * BACKEND TODO:
   * EN EL FUTURO, ESTA FUNCIÓN DEBERÁ ACTUALIZAR LA CANTIDAD
   * EN LA BASE DE DATOS A TRAVÉS DE UNA LLAMADA AL BACKEND
   */
  const handleQuantityChange = (item, newQuantity) => {
    // VALIDAR CANTIDAD MÍNIMA
    if (newQuantity < 1) newQuantity = 1;
    
    // ACTUALIZAR USANDO LA FUNCIÓN DEL CONTEXTO
    updateQuantity(item, newQuantity);
  };
  
  /* FUNCIÓN PARA ELIMINAR PRODUCTO
   * UTILIZA LA FUNCIÓN removeFromCart DEL CONTEXTO
   * ELIMINA COMPLETAMENTE UN PRODUCTO DEL CARRITO
   * 
   * BACKEND TODO:
   * EN EL FUTURO, ESTA FUNCIÓN DEBERÁ ELIMINAR EL PRODUCTO
   * DE LA BASE DE DATOS A TRAVÉS DE UNA LLAMADA AL BACKEND
   */
  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  return (
    <div className="cart-page">
      <NavegadorMenu />
      
      <div className="cart-container">
        <h1 className="cart-title">Mi Carrito</h1>
        
        {!isLoggedIn && (
          <div className="login-required">
            <i className="fas fa-user-lock login-icon"></i>
            <h2>Inicia sesión para continuar con la compra</h2>
            <p>Para añadir productos al carrito necesitas iniciar sesión</p>
            <button onClick={() => router.push('/Pages/Registro')} className="btn-login">
              Iniciar Sesión
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
                      src={item.imagen || getImagenCoche(item.modelo_id)} 
                      alt={item.nombre || `Coche ${item.modelo_id}`} 
                      onError={(e) => { e.target.src = '/FOTOS/COCHES/default.jpg' }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.nombre || `${item.marca || 'Marca'} ${item.modelo || 'Modelo'}`}</h3>
                    <div className="item-specs">
                      <span><i className="fas fa-calendar-alt"></i> {item.anio || '2023'}</span>
                      <span><i className="fas fa-gas-pump"></i> {item.tipo_combustible || 'Gasolina'}</span>
                      <span><i className="fas fa-palette"></i> {item.color || 'No especificado'}</span>
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
                    {(parseFloat(item.precio || 0) * (item.quantity || 1)).toLocaleString('es-ES')} €
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item)}
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
                <span>{(parseFloat(cartTotal) || 0).toLocaleString('es-ES')} €</span>
              </div>
              <div className="summary-row">
                <span>IVA (21%):</span>
                <span>{((parseFloat(cartTotal) || 0) * 0.21).toLocaleString('es-ES')} €</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{((parseFloat(cartTotal) || 0) * 1.21).toLocaleString('es-ES')} €</span>
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
