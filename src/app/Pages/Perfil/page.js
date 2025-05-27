'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorPag from "../../component/Pages/Menu/Navegador";
import ReqPedidos from "../../component/AxiosResquestAll/RequestsPedidos";
import './perfil.css';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // CARGAR DATOS DEL USUARIO Y PEDIDOS
  useEffect(() => {
    // Verificar autenticación
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/Pages/Registro');
      return;
    }

    // Cargar datos del usuario
    setUser(JSON.parse(userData));
    
    // Cargar pedidos
    const cargarPedidos = async () => {
      try {
        const pedidosData = await ReqPedidos.getPedidosUsuario();
        if (pedidosData) {
          setPedidos(pedidosData);
        }
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    cargarPedidos();
  }, [router]);

  // FORMATEAR FECHA
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatFecha = (fecha) => {
    try {
      return format(new Date(fecha), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  const getEstadoClass = (estado) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'pendiente';
      case 'completado':
      case 'entregado':
        return 'completado';
      case 'cancelado':
        return 'cancelado';
      default:
        return 'procesando';
    }
  };

  const getEstadoPagoClass = (estadoPago) => {
    switch (estadoPago.toLowerCase()) {
      case 'completado':
        return 'completado';
      case 'pendiente':
        return 'pendiente';
      case 'fallido':
        return 'fallido';
      default:
        return 'pendiente';
    }
  };

  // PANTALLA DE CARGA
  if (isLoading) {
    return (
      <>
        <NavegadorPag />
        <div className="perfil-container">
          <div className="loading-container">
            <h1>Cargando...</h1>
            <div className="loader"></div>
          </div>
        </div>
      </>
    );
  }

  // PANTALLA PRINCIPAL
  return (
    <div className="perfil-page">
      <NavegadorPag />
      <div className="perfil-container">
        {/* SECCIÓN DE INFORMACIÓN DEL USUARIO */}
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
        </div>
        
        {user && (
          <div className="user-info">
            <div className="user-details">
              <h2>{user.nombre} {user.apellido}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
            </div>
          </div>
        )}
        
        {/* SECCIÓN DE PEDIDOS */}
        <div className="pedidos-section">
          <h2>Mis Pedidos</h2>
          {pedidos.length === 0 ? (
            <div className="no-pedidos">
              <p>No tienes pedidos realizados</p>
              <button onClick={() => router.push('/Pages/Catalogo')} className="shop-now-button">
                Explorar catálogo
              </button>
            </div>
          ) : (
            <div className="pedidos-list">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-header">
                    <div>
                      <h3>Pedido #{pedido.id}</h3>
                      <span className="fecha-pedido">{formatFecha(pedido.fechaCreacion)}</span>
                    </div>
                    <span className={`estado-pedido ${getEstadoClass(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="pedido-content">
                    <p><strong>Total:</strong> {pedido.importeTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                    <p><strong>Dirección de envío:</strong> {pedido.direccionEnvio}</p>
                    <p><strong>Método de pago:</strong> {pedido.metodoPago}</p>
                    <div className={`estado-pago ${getEstadoPagoClass(pedido.estadoPago)}`}>
                      Estado del pago: {pedido.estadoPago}
                    </div>
                  </div>
                  {pedido.items && pedido.items.length > 0 && (
                    <div className="pedido-items">
                      <h3>Productos</h3>
                      <ul>
                        {pedido.items.map((item) => (
                          <li key={item.id}>
                            {item.nombreProducto} - Cantidad: {item.cantidad} - 
                            Precio: {item.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
