"use client";

/* PÁGINA DEL CARRITO DE COMPRAS
 * ESTA PÁGINA MUESTRA LOS PRODUCTOS AÑADIDOS AL CARRITO
 * PERMITE GESTIONAR CANTIDADES, ELIMINAR PRODUCTOS Y FINALIZAR LA COMPRA
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import { useCart } from "../../context/CartContext";
import "./cart.css";
import ReqCarrito from "../../component/AxiosResquestAll/RequestsCarrito";
import ReqProductos from "../../component/AxiosResquestAll/RequestsProductos";

import ProductosCesta from "./ProductosCesta";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // VERIFICAR AUTENTICACIÓN DEL USUARIO
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkAuth();

    window.addEventListener("login", checkAuth);
  }, []);

  const continuarComprando = () => {
    router.push("/Pages/Catalogo");
  };

  const realizarCompra = async () => {
    // Mostramos un estado de procesamiento
    setIsProcessing(true);
    
    try {
      // Vaciar el carrito del usuario en el backend
      await ReqCarrito.clearUserCart();
      
      // Limpiamos el estado local del carrito
      setProductosCarrito([]);
      setCarritoItems([]);
      
      // Redirigimos a la página de confirmación
      router.push("/Pages/OrderConfirmation");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Ha ocurrido un error al procesar tu compra. Por favor, inténtalo de nuevo.");
      setIsProcessing(false);
    }
  };
  const [productosCarrito, setProductosCarrito] = useState([]);

  const [carritoItems, setCarritoItems] = useState([]);

  const searchProductos = async (id, ItemId, CantidadItem) => {
    const response = await ReqCarrito.getCarritoUsuario(id);
    console.log("producto response", JSON.stringify(response, null, 2));
    const itemDates = Array.isArray(response) ? response[0] : response;

    const producto = await ReqProductos.getProductoById(itemDates.productoId);
    console.log(" producto itemDates", JSON.stringify(itemDates, null, 2));
    console.log(" producto", JSON.stringify(producto, null, 2));
    const productoConItemId = {
      ...itemDates,
      carritoItemId: ItemId,
      cantidad: CantidadItem,
    };

    setProductosCarrito((prevProductos) => [
      ...prevProductos,
      productoConItemId,
    ]);
  };
  const fetchCarrito = async () => {
    const carrito = await ReqCarrito.getCarritoUsuario();
    if (!carrito || carrito.length === 0) {
      return;
    } else {
      setCarritoItems(carrito);
    }

    // o lo que necesites hacer con los datos
  };

  useEffect(() => {
    fetchCarrito();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!carritoItems || carritoItems.length === 0) {
        // Si no hay items en el carrito, asegurarse de que productosCarrito esté vacío
        setProductosCarrito([]);
        return;
      }

      try {
        // Limpiar el estado anterior para evitar datos duplicados
        setProductosCarrito([]);
        
        const productos = await Promise.all(
          carritoItems.map(async (item) => {
            const producto = await ReqProductos.getProductoById(item.productoId);
            if (!producto) {
              console.error(`No se pudo obtener el producto con ID ${item.productoId}`);
              return null;
            }
            return {
              ...producto,
              carritoItemId: item.id,
              cantidad: item.cantidad,
            };
          })
        );
        
        // Filtrar cualquier producto nulo que pueda haber resultado de errores
        const productosValidos = productos.filter(p => p !== null);
        console.log('Productos válidos cargados en el carrito:', productosValidos.length);
        
        // Actualizar el estado con los productos válidos
        setProductosCarrito(productosValidos);
      } catch (error) {
        console.error('Error al cargar los productos del carrito:', error);
        setProductosCarrito([]);
      }
    };

    fetchProductos();
  }, [carritoItems]);

  const mostrarContenido = isLoggedIn && productosCarrito.length !== 0;

  const noLogeado = !isLoggedIn;

  return (
    <div className="cart-page">
      <NavegadorMenu />
      <div className="cart-container">
        <h1 className="cart-title">Mi Carrito</h1>
        {/* <pre> {JSON.stringify(cartItems)}</pre> */}
        {noLogeado && (
          <div className="login-required">
            <i className="fas fa-user-lock login-icon"></i>
            <h2>Inicia sesión para continuar con la compra</h2>
            <p>Para añadir productos al carrito necesitas iniciar sesión</p>
            <button
              onClick={() => router.push("/Pages/Registro")}
              className="btn-login"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
        {!noLogeado && productosCarrito.length === 0 && (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <p>Tu carrito está vacío</p>
          </div>
        )}
        <div className="cart-buttons">
          <button onClick={continuarComprando} className="btn-continuar">
            Explorar catálogo
          </button>
          {mostrarContenido && (
            <button onClick={realizarCompra} className="btn-comprar">
              Realizar Compra
            </button>
          )}
        </div>
        {mostrarContenido && (
          <ProductosCesta 
            productoCesta={productosCarrito || []} 
            onRemoveItem={(carritoItemId) => {
              // Actualizamos ambos estados de forma síncrona
              const newProductosCarrito = productosCarrito.filter(item => item.carritoItemId !== carritoItemId);
              const newCarritoItems = carritoItems.filter(item => item.id !== carritoItemId);
              
              setProductosCarrito(newProductosCarrito);
              setCarritoItems(newCarritoItems);
              
              // Forzamos una actualización del estado mostrarContenido
              if (newProductosCarrito.length === 0) {
                setProductosCarrito([]);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
