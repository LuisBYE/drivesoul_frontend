'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorPag from "../../component/Pages/Menu/Navegador";
import ReqPedidos from '../../component/AxiosResquestAll/RequestsPedidos';
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
        const data = await ReqPedidos.getPedidosUsuario();
        setPedidos(data || []);
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
          
          {/* MENSAJE SI NO HAY PEDIDOS */}
          {pedidos.length === 0 ? (
            <div className="no-pedidos">
              <p>No tienes pedidos realizados</p>
              <button onClick={() => router.push('/Pages/Catalogo')} className="shop-now-button">
                Explorar catálogo
              </button>
            </div>
          ) : (
            /* LISTA DE PEDIDOS */
            <div className="pedidos-list">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  {/* CABECERA DEL PEDIDO */}
                  <div className="pedido-header">
                    <h3>Pedido #{pedido.id}</h3>
                    <span className={`estado ${pedido.estado?.toLowerCase() || 'pendiente'}`}>
                      {pedido.estado || 'Pendiente'}
                    </span>
                  </div>
                  
                  {/* INFORMACIÓN BÁSICA DEL PEDIDO */}
                  <div className="pedido-info">
                    <p><strong>Fecha:</strong> {formatDate(pedido.fecha || new Date())}</p>
                    <p><strong>Total:</strong> {(pedido.total || 0).toFixed(2)}€</p>
                  </div>
                  
                  {/* BOTÓN PARA VER DETALLES */}
                  <button 
                    className="view-details-btn"
                    onClick={() => router.push(`/Pages/Pedidos/${pedido.id}`)}
                  >
                    Ver detalles completos
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
