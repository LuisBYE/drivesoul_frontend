'use client';

/* CONTEXTO DEL CARRITO DE COMPRAS
 * ESTE ARCHIVO CONTIENE TODA LA LÓGICA PARA GESTIONAR EL CARRITO DE COMPRAS
 * SE ENCARGA DE ALMACENAR LOS PRODUCTOS, CALCULAR TOTALES Y PROPORCIONAR
 * FUNCIONES PARA AÑADIR, ELIMINAR Y ACTUALIZAR PRODUCTOS
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

// CREACIÓN DEL CONTEXTO
export const CartContext = createContext();

// PROVEEDOR DEL CONTEXTO
export const CartProvider = ({ children }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // CARGAR CARRITO DESDE LOCALSTORAGE
  useEffect(() => {
    const loadCart = () => {
      if (isLoggedIn) {
        try {
          const storedCart = localStorage.getItem('drivesoulCart');
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartItems(parsedCart);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    
    loadCart();
    
    const handleStorageChange = () => loadCart();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]);

  // ACTUALIZAR CONTADOR Y TOTAL
  useEffect(() => {
    // Calcular cantidad total de items
    const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
    
    // Calcular precio total
    const total = cartItems.reduce((total, item) => {
      return total + (item.precio * (item.quantity || 1));
    }, 0);
    setCartTotal(total);
    
    // Guardar en localStorage si está autenticado
    if (isLoggedIn && cartItems.length > 0) {
      localStorage.setItem('drivesoulCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  // AÑADIR PRODUCTO AL CARRITO
  const addToCart = (coche) => {
    // Verificar autenticación
    if (!isLoggedIn) {
      router.push('/Pages/cart');
      return;
    }
    
    // Asegurarse de que los campos obligatorios existan
    if (!coche.modelo_id || !coche.precio) {
      console.error('Error: El coche no tiene modelo_id o precio');
      return;
    }
    
    // Obtener nombre real del coche según modelo_id
    const getNombreCoche = (modelo_id) => {
      const nombresCoches = {
        1: 'Seat Ibiza',
        2: 'Hyundai i30 N Fastback',
        3: 'Seat Leon',
        4: 'Seat Arona',
        90: 'Seat Leon',
        91: 'Seat Arona',
        92: 'Hyundai Tucson',
        93: 'Hyundai Kona',
        94: 'Audi A3',
        95: 'Audi A4',
        96: 'Audi Q5',
        97: 'Volkswagen Golf',
        98: 'Volkswagen Polo',
        99: 'Volkswagen T-Roc',
        100: 'Peugeot 208',
        101: 'Peugeot 3008',
        102: 'Peugeot 508',
        103: 'Mercedes Clase A',
        104: 'Mercedes Clase C',
        105: 'Mercedes GLC'
      };
      return nombresCoches[modelo_id] || `Coche ${modelo_id}`;
    };
    
    // Obtener marca del coche según modelo_id
    const getMarcaCoche = (modelo_id) => {
      const marcasCoches = {
        1: 'Seat',
        2: 'Hyundai',
        3: 'Seat',
        4: 'Seat',
        90: 'Seat',
        91: 'Seat',
        92: 'Hyundai',
        93: 'Hyundai',
        94: 'Audi',
        95: 'Audi',
        96: 'Audi',
        97: 'Volkswagen',
        98: 'Volkswagen',
        99: 'Volkswagen',
        100: 'Peugeot',
        101: 'Peugeot',
        102: 'Peugeot',
        103: 'Mercedes',
        104: 'Mercedes',
        105: 'Mercedes'
      };
      return marcasCoches[modelo_id] || 'Marca';
    };
    
    // Obtener modelo del coche según modelo_id
    const getModeloCoche = (modelo_id) => {
      const modelosCoches = {
        1: 'Ibiza',
        2: 'i30 N Fastback',
        3: 'Leon',
        4: 'Arona',
        90: 'Leon',
        91: 'Arona',
        92: 'Tucson',
        93: 'Kona',
        94: 'A3',
        95: 'A4',
        96: 'Q5',
        97: 'Golf',
        98: 'Polo',
        99: 'T-Roc',
        100: '208',
        101: '3008',
        102: '508',
        103: 'Clase A',
        104: 'Clase C',
        105: 'GLC'
      };
      return modelosCoches[modelo_id] || 'Modelo';
    };
    
    // Preparar objeto del coche con valores por defecto para evitar undefined
    const cocheCompleto = {
      id: coche.modelo_id,
      modelo_id: coche.modelo_id,
      marca: coche.marca || getMarcaCoche(coche.modelo_id),
      modelo: coche.modelo || getModeloCoche(coche.modelo_id),
      nombre: coche.nombre || getNombreCoche(coche.modelo_id),
      precio: coche.precio || 0,
      anio: coche.anio || coche.año || '2023',
      color: coche.color || 'No especificado',
      tipo_combustible: coche.tipo_combustible || coche.combustible || 'Gasolina',
      imagen: coche.imagen || '/FOTOS/COCHES/default.jpg',
      quantity: 1
    };
    
    // Verificar si ya existe
    const existingItemIndex = cartItems.findIndex(item => item.modelo_id === coche.modelo_id);
    
    let updatedItems = [];
    
    if (existingItemIndex !== -1) {
      // Si existe, incrementar cantidad
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
      };
    } else {
      // Si no existe, añadirlo
      updatedItems = [...cartItems, { ...cocheCompleto, quantity: 1 }];
    }
    
    // Actualizar estado y localStorage
    setCartItems(updatedItems);
    localStorage.setItem('drivesoulCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
    
    // Redirigir al carrito
    router.push('/Pages/cart');
  };

  // ELIMINAR PRODUCTO DEL CARRITO
  const removeFromCart = (coche) => {
    const updatedItems = cartItems.filter(item => item.modelo_id !== coche.modelo_id);
    setCartItems(updatedItems);
    localStorage.setItem('drivesoulCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
  };

  // ACTUALIZAR CANTIDAD DE UN PRODUCTO
  const updateQuantity = (coche, quantity) => {
    if (quantity <= 0) {
      removeFromCart(coche);
      return;
    }
    
    const updatedItems = cartItems.map(item => 
      item.modelo_id === coche.modelo_id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('drivesoulCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage'));
  };

  // VACIAR CARRITO
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('drivesoulCart');
    window.dispatchEvent(new Event('storage'));
  };

  // VALORES PROPORCIONADOS POR EL CONTEXTO
  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      isLoggedIn,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// HOOK PARA USAR EL CONTEXTO
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
