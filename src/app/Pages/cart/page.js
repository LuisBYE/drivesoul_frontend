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

    window.addEventListener("storage", checkAuth);
    window.addEventListener("login", checkAuth);
    window.addEventListener("logout", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("login", checkAuth);
      window.removeEventListener("logout", checkAuth);
    };
  }, []);

  /* FUNCIÓN PARA OBTENER LA IMAGEN DEL COCHE
   * DEVUELVE LA RUTA DE LA IMAGEN PRINCIPAL DEL COCHE SEGÚN SU MODELO_ID
   * SI NO ENCUENTRA LA IMAGEN, DEVUELVE UNA IMAGEN POR DEFECTO
   */
  const getImagenCoche = (modelo_id) => {
    // MAPA DE IMÁGENES POR MODELO
    const rutasImagenes = {
      1: "/FOTOS/COCHES/SEATIBIZAROJO/1.jpg",
      2: "/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png",
      3: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
      4: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
      90: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
      91: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
    };

    // DEVOLVER IMAGEN SEGÚN MODELO_ID O IMAGEN POR DEFECTO
    return rutasImagenes[modelo_id] || "/FOTOS/COCHES/default.jpg";
  };

  /* FUNCIÓN PARA CONTINUAR COMPRANDO
   * REDIRIGE AL USUARIO AL CATÁLOGO DE PRODUCTOS
   */
  const continuarComprando = () => {
    router.push("/Pages/Catalogo");
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
      router.push("/Pages/Registro");
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
      router.push("/");
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
  const [productosCarrito, setProductosCarrito] = useState([]);

  const [carritoItems, setCarritoItems] = useState([]);
  const datosCarritoItem = async () => {
    // Traera todo los prductos de carrito_item
    const response = await ReqCarrito.getCarritoUsuario();
    if (response) {
      setCarritoItems(response);
      console.log(`datos de carrito ${JSON.stringify(response)}`);
    } else {
      console.log(" Error no han cargado los datos del carrito ");
    }
  };

  const searchProductos = async (id) => {
    console.log(`idUSUARIO ${JSON.stringify(carritoItems)}`);

    const response = await ReqProductos.getProductoById(id);
    if (response) {
      setProductosCarrito((prevProductos) => [...prevProductos, response]); // Agrega el producto al estado
    } else {
      alert("No se encontró producto por ID");
    }
  };

  useEffect(() => {
    datosCarritoItem();
  }, []);

  useEffect(() => {
    if (carritoItems !== 0) {
      carritoItems.map((item) => {
        alert("rellan los datos");
        console.log(`idUSUARIO ${JSON.stringify(item.usuarioId)}`);
        searchProductos(item.usuarioId);
      });
    } else {
      alert("no hay datos de carrito_Items");
    }
  }, [carritoItems]);

  const mostrarContenido = isLoggedIn && productosCarrito.length !== 0;

  const noLogeado = !isLoggedIn;

  return (
    <div className="cart-page">
      <NavegadorMenu />

      <div className="cart-container">
        <h1 className="cart-title">Mi Carrito</h1>
        {/* <pre> {JSON.stringify(cartItems)}</pre>
        <pre> carritoItems {JSON.stringify(carritoItems)}</pre>
        <pre> datos buenos {JSON.stringify(productosCarrito)}</pre>
        <pre> mostrarContenido {JSON.stringify(mostrarContenido)}</pre>
        <pre> isLoggedIn {JSON.stringify(isLoggedIn)}</pre> */}
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
        {cartItems === 0 ||
          (productosCarrito.length === 0 && (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart empty-cart-icon"></i>
              <p>Tu carrito está vacío</p>
              <button onClick={continuarComprando} className="btn-continuar">
                Explorar catálogo
              </button>
            </div>
          ))}

        {mostrarContenido && (
          <ProductosCesta productoCesta={productosCarrito || []} />
        )}
      </div>
    </div>
  );
}
