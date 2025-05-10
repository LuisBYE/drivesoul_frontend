'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
  baseURL: 'http://localhost:5138/api',
  timeout: 5000
});

// Interceptor para añadir el token de autenticación
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Creamos el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado para almacenar los items del carrito
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Comprobar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // Cargar el carrito al iniciar
  useEffect(() => {
    if (isLoggedIn) {
      // Si está autenticado, cargar desde el servidor
      fetchCartFromServer();
    } else {
      // Si no está autenticado, cargar desde localStorage
      const storedCart = localStorage.getItem('drivesoulCart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart || []);
        } catch (error) {
          setCartItems([]);
        }
      }
    }
  }, [isLoggedIn]);

  // Actualizar localStorage cuando cambie el carrito
  useEffect(() => {
    if (!isLoggedIn && cartItems.length > 0) {
      localStorage.setItem('drivesoulCart', JSON.stringify(cartItems));
    }
    
    // Actualizar el contador y el total
    const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
    
    const total = cartItems.reduce((total, item) => {
      return total + (item.precio * (item.quantity || 1));
    }, 0);
    setCartTotal(total);
  }, [cartItems, isLoggedIn]);

  // Sincronizar carrito cuando el usuario inicie sesión
  useEffect(() => {
    if (isLoggedIn) {
      syncCartWithServer();
    }
  }, [isLoggedIn]);

  // Función para cargar el carrito desde el servidor
  const fetchCartFromServer = async () => {
    if (!isLoggedIn) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/carrito');
      
      if (response.data && response.data.success) {
        setCartItems(response.data.data || []);
      } else if (Array.isArray(response.data)) {
        setCartItems(response.data);
      }
    } catch (error) {
      setError('No se pudo cargar el carrito');
    } finally {
      setIsLoading(false);
    }
  };

  // Añadir un item al carrito
  const addToCart = async (coche) => {
    if (isLoggedIn) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post('/carrito', {
          coche_id: coche.id,
          cantidad: 1
        });
        
        if (response.data.success) {
          fetchCartFromServer();
        }
      } catch (error) {
        setError('No se pudo añadir al carrito');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.id === coche.id);
        
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
          return updatedItems;
        } else {
          return [...prevItems, { ...coche, quantity: 1 }];
        }
      });
    }
  };

  // Eliminar un item del carrito
  const removeFromCart = async (cocheId) => {
    if (isLoggedIn) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.delete(`/carrito/item/${cocheId}`);
        if (response.data.success) {
          fetchCartFromServer();
        }
      } catch (error) {
        setError('No se pudo eliminar del carrito');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.id !== cocheId));
    }
  };

  // Actualizar la cantidad de un item
  const updateQuantity = async (cocheId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cocheId);
      return;
    }
    
    if (isLoggedIn) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.put(`/carrito/item/${cocheId}`, { cantidad: quantity });
        if (response.data.success) {
          fetchCartFromServer();
        }
      } catch (error) {
        setError('No se pudo actualizar la cantidad');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === cocheId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Limpiar el carrito
  const clearCart = async () => {
    if (isLoggedIn) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.delete('/carrito');
        if (response.data.success) {
          setCartItems([]);
        }
      } catch (error) {
        setError('No se pudo vaciar el carrito');
      } finally {
        setIsLoading(false);
      }
    } else {
      setCartItems([]);
    }
  };

  // Sincronizar carrito local con el servidor al iniciar sesión
  const syncCartWithServer = async () => {
    if (!isLoggedIn || cartItems.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    try {
      for (const item of cartItems) {
        await api.post('/carrito', {
          coche_id: item.id,
          cantidad: item.quantity
        });
      }
      localStorage.removeItem('drivesoulCart');
      fetchCartFromServer();
    } catch (error) {
      setError('No se pudo sincronizar el carrito');
    } finally {
      setIsLoading(false);
    }
  };

  // Crear un pedido con los items del carrito
  const createOrder = async (orderData) => {
    if (!isLoggedIn) {
      setError('Debes iniciar sesión para realizar un pedido');
      return { success: false, error: 'Autenticación requerida' };
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const pedidoData = {
        direccion_envio: orderData.direccion_envio || orderData.direccionEnvio,
        metodo_pago: orderData.metodo_pago || orderData.metodoPago
      };
      
      const response = await api.post('/pedidos', pedidoData);
      
      if (response.data && response.data.success) {
        clearCart();
        return { success: true, order: response.data.data };
      }
      return { success: false, error: 'Error al crear el pedido' };
    } catch (error) {
      setError('No se pudo crear el pedido');
      return { success: false, error: 'Error desconocido' };
    } finally {
      setIsLoading(false);
    }
  };

  // Valor del contexto
  const contextValue = {
    cartItems,
    cartCount,
    cartTotal,
    isLoading,
    error,
    isLoggedIn,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
