'use client';

/**
 * Este componente proporciona todos los contextos necesarios para la aplicación
 * Al usar 'use client', garantizamos que los contextos estén disponibles en el lado del cliente
 * Actualmente solo incluye el CartProvider, pero se pueden añadir más proveedores según sea necesario
 */

import { CartProvider } from './context/CartContext';

export default function ClientProviders({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
