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
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      router.push('/Pages/Registro');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      fetchPedidos();
    } catch (error) {
      setError('Error al cargar los datos del usuario');
      setIsLoading(false);
    }
  }, [router]);

  const fetchPedidos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ReqPedidos.getPedidosUsuario();
      setPedidos(data || []);
    } catch (error) {
      setError('No se pudieron cargar los pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

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

  if (error) {
    return (
      <>
        <NavegadorPag />
        <div className="perfil-container">
          <div className="error-container">
            <h1>Error</h1>
            <p>{error}</p>
            <button onClick={() => fetchPedidos()} className="retry-button">
              Intentar nuevamente
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="perfil-page">
      <NavegadorPag />
      <div className="perfil-container">
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
              {pedidos.map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-header">
                    <h3>Pedido #{pedido.id}</h3>
                    <span className={`estado ${pedido.estado?.toLowerCase() || 'pendiente'}`}>
                      {pedido.estado || 'Pendiente'}
                    </span>
                  </div>
                  
                  <div className="pedido-info">
                    <p><strong>Fecha:</strong> {formatDate(pedido.fecha || new Date())}</p>
                    <p><strong>Total:</strong> {(pedido.total || 0).toFixed(2)}€</p>
                    <p><strong>Dirección de envío:</strong> {pedido.direccion_envio || 'No especificada'}</p>
                    <p><strong>Método de pago:</strong> {pedido.metodo_pago || 'No especificado'}</p>
                  </div>
                  
                  <div className="pedido-items">
                    <h4>Coches en este pedido:</h4>
                    <ul>
                      {pedido.items && pedido.items.length > 0 ? pedido.items.map(item => (
                        <li key={item.id} className="pedido-item">
                          <div className="item-image">
                            <img 
                              src={item.coche?.imagen || '/FOTOS/default-car.jpg'} 
                              alt={`${item.coche?.marca || ''} ${item.coche?.modelo || ''}`} 
                              onError={(e) => e.target.src = '/FOTOS/default-car.jpg'}
                            />
                          </div>
                          <div className="item-details">
                            <p className="item-name">{item.coche?.marca || ''} {item.coche?.modelo || ''}</p>
                            <p className="item-price">{(item.precio_unitario || 0).toFixed(2)}€ x {item.cantidad || 1}</p>
                          </div>
                        </li>
                      )) : (
                        <li className="no-items">No hay detalles disponibles</li>
                      )}
                    </ul>
                  </div>
                  
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
