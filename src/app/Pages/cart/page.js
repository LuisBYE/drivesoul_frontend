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
  const [productosCarrito, setProductosCarrito] = useState([]);

  const [carritoItems, setCarritoItems] = useState([]);
  const datosCarritoItem = async () => {
    // Traera todo los prductos de carrito_item
    const response = await ReqCarrito.getCarritoUsuario();
    if (response) {
      console.log(`datos de carrito 1 ${JSON.stringify(response.length)}`);
      setCarritoItems(response);
      console.log(`datos de carrito 2 ${JSON.stringify(response)}`);
    } else {
      alert("error al peticion ger")

    }
  };

  const searchProductos = async (id, ItemId, CantidadItem) => {
    // console.log(`idUSUARIO ${JSON.stringify(id)}`);
    // console.log(`aqui xd:  ${JSON.stringify(ItemId)}`)
    const response = await ReqProductos.getProductoById(id);
    if (response) {
      const productoConItemId = {
        ...response,
        carritoItemId: ItemId,
        cantidad:CantidadItem, // Este ID debe ser único por item en el carrito
      };
      // console.log("aqui", JSON.stringify(productoConItemId,null,2))
      setProductosCarrito((prevProductos) => [...prevProductos, productoConItemId]);
    } else {
      alert("No se encontró producto por ID");
    }
  };

  useEffect(() => {
    datosCarritoItem();
  }, []);

  useEffect(() => {

    if (carritoItems > 0) {
  
      carritoItems.map((item) => {
      
        searchProductos(item.usuarioId, item.id, item.cantidad);
      });
    } else {
      alert("no hay datos de carrito_Items");
    }
  }, [carritoItems]);

  const mostrarContenido = isLoggedIn && productosCarrito.length !== 0;

  const noLogeado = !isLoggedIn;

  return (
    <div className="cart-page">
      <pre> {JSON.stringify(carritoItems > 0)}</pre>
      <NavegadorMenu />
      <pre>productosCarrito {JSON.stringify(productosCarrito)}</pre>
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
        <button onClick={continuarComprando} className="btn-continuar">
          Explorar catálogo
        </button>
        {mostrarContenido && (
          <ProductosCesta productoCesta={productosCarrito || []} />
        )}
      </div>
    </div>
  );
}
