// Importa el paquete 'next' completamente
import next from 'next';


const nextConfig = {
    // Configuración de Next.js
    experimental: {
        taint: true,
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*', // Redirige las solicitudes que lleguen a /api/
                destination: 'http://localhost:5138/api/:path*', // Redirige a tu backend
            },
        ];
    },

};

export default nextConfig; // Exporta la configuración de Next.js