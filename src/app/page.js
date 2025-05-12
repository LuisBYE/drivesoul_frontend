"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavegadorPag from "./component/Pages/Menu/Navegador";
import Footer from "./component/footer";
import ReqCoches from "./component/AxiosResquestAll/RequestsCoches";
import { useRouter } from "next/navigation";

export default function Home() {
  const [respuesta, setRespuesta] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const scrollRef = useRef(null);
  const router = useRouter();

  // Efecto para la animación de carga inicial
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  // Efecto para el seguimiento del scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para desplazarse hacia abajo
  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Obtener productos aleatorios
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const coches = await ReqCoches.getCoches();
        if (coches && coches.length > 0) {
          // Obtener 3 coches aleatorios
          const cochesAleatorios = [...coches]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setProductos(cochesAleatorios);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  // Comprobar conexión con el backend
  useEffect(() => {
    axios
      .get("http://localhost:5138/api/DatabaseTest")
      .then((response) => {
        setRespuesta("Conexión exitosa");
      })
      .catch((error) => {
        console.log(error.message);
        setRespuesta(error.message);
      });
  }, []);

  // Función para navegar a la página de catálogo
  const navegarACatalogo = () => {
    router.push("/Pages/Catalogo");
  };

  // Función para navegar a la página de contacto
  const navegarAContacto = () => {
    router.push("/Pages/Contacto");
  };

  // Función para navegar a detalles del coche
  const navegarADetalles = (coche) => {
    localStorage.setItem("cocheSeleccionado", JSON.stringify(coche));
    router.push(`/Pages/Coches/${coche.modelo_id}`);
  };

  // Función para obtener la imagen del coche
  const getImagenCoche = (modelo_id) => {
    const rutasImagenes = {
      1: "/FOTOS/COCHES/SEATIBIZAROJO/1.jpg",
      2: "/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png",
      90: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
      91: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
      92: "/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.png",
      93: "/FOTOS/COCHES/HYUNDAIKONA/1.jpg",
      94: "/FOTOS/COCHES/AUDIA3NEGRO/1.png",
      95: "/FOTOS/COCHES/AUDIA4AZUL/1.png",
      96: "/FOTOS/COCHES/AUDIQ5BLANCO/1.png",
      97: "/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.png",
      98: "/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.png",
      99: "/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.png",
      100: "/FOTOS/COCHES/PEUGEOT208AZUL/1.png",
      101: "/FOTOS/COCHES/PEUGEOT3008BLANCO/1.png",
      102: "/FOTOS/COCHES/PEUGEOT508GRIS2023/1.png",
      103: "/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.png",
      104: "/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpeg",
      105: "/FOTOS/COCHES/MERCEDES GLCAZUL/1.png",
    };

    return rutasImagenes[modelo_id] || "/FOTOS/COCHES/default.jpg";
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <NavegadorPag />
      
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <video
            className="object-cover w-full h-full filter brightness-40"
            autoPlay
            muted
            loop
            src="/VIDEOS/VIDEOBANNER.mp4"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>
        
        <div 
          className={`relative z-10 flex flex-col items-center justify-center h-full px-4 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-8">
            <span className="text-white">DRIVE</span><span className="text-red-600">SOUL</span>
          </h1>
          
          <p className="text-xl md:text-3xl max-w-2xl font-light mb-12 text-white opacity-80">
            Descubre la pasión por conducir
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <button 
              onClick={navegarACatalogo}
              className="px-10 py-4 bg-red-600 rounded-sm font-medium text-white uppercase tracking-wider transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            >
              Explorar Vehículos
            </button>
            
            <button 
              onClick={navegarAContacto}
              className="px-10 py-4 border-2 border-white rounded-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
            >
              Contactar
            </button>
          </div>
          
          <div 
            onClick={scrollDown} 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <div className="relative w-12 h-20">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-0.5 h-16 bg-gradient-to-b from-red-600 to-transparent" 
                  style={{
                    animation: 'pulseOpacity 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6">
                <div className="w-full h-full relative">
                  <div className="absolute w-6 h-6 border-b-2 border-r-2 border-red-600 transform rotate-45 opacity-0"
                    style={{
                      animation: 'arrowDown 2s ease-in-out infinite'
                    }}
                  ></div>
                  <div className="absolute w-6 h-6 border-b-2 border-r-2 border-red-600 transform rotate-45 opacity-0"
                    style={{
                      animation: 'arrowDown 2s ease-in-out 0.5s infinite'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section ref={scrollRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            <span className="text-white">Productos</span>
            <span className="text-red-600"> Destacados</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">Descubre nuestra selección de vehículos de alta gama diseñados para satisfacer tus expectativas</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productos.length > 0 ? (
              productos.map((coche) => (
                <div key={coche.id} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={getImagenCoche(coche.modelo_id)} 
                      alt={coche.nombre} 
                      className="w-full h-full object-cover" 
                    />
                    {coche.tipo_combustible && coche.tipo_combustible.toLowerCase() === "híbrido" && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        ECO
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {coche.kilometraje === 0 ? "NUEVO" : "USADO"}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{coche.nombre}</h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-red-500">
                        {coche.precio?.toLocaleString("es-ES")} €
                      </div>
                      <div className="text-sm text-gray-400">
                        Desde {Math.round(coche.precio / 72)?.toLocaleString("es-ES")} €/mes
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded">
                        {coche.anio}
                      </span>
                      <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded">
                        {coche.kilometraje?.toLocaleString("es-ES")} km
                      </span>
                      <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded">
                        {coche.tipo_combustible}
                      </span>
                      <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded">
                        {coche.transmision}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navegarADetalles(coche)}
                      className="w-full bg-red-600 text-white py-2 rounded-sm font-medium transition-all duration-300 hover:bg-red-700"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-400">Cargando productos destacados...</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={navegarACatalogo}
              className="px-8 py-3 bg-transparent border-2 border-red-600 text-red-600 rounded-sm font-medium transition-all duration-300 hover:bg-red-600 hover:text-white"
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 md:px-8 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Por qué elegirnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Selección Premium</h3>
              <p className="text-gray-400">Ofrecemos solo los mejores vehículos del mercado, cuidadosamente seleccionados.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Servicio Rápido</h3>
              <p className="text-gray-400">Proceso de compra simplificado y entrega en tiempo récord.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Garantía Extendida</h3>
              <p className="text-gray-400">Todos nuestros vehículos incluyen garantía extendida para tu tranquilidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Espacio para contenido adicional */}
      <section className="py-16 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Espacio reservado para futuro contenido */}
        </div>
      </section>

      {/* CTA con efecto interactivo */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-t from-black to-zinc-900 relative overflow-hidden">
        {/* Fondo con efecto de malla 3D */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-full border-r border-white opacity-30"></div>
              ))}
            </div>
            <div className="grid grid-rows-12 w-full h-full absolute top-0 left-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-full border-b border-white opacity-30"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Fondo limpio sin círculos decorativos */}
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        
        {/* Contenido principal con efecto de revelación al scroll */}
        <div 
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{
            opacity: Math.min(1, scrollY / 500),
            transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">
            <span className="text-white">¿Listo para encontrar tu </span>
            <span className="text-red-600">próximo vehículo</span>
            <span className="text-white">?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">Descubre nuestra selección de vehículos premium y vive la experiencia DriveSoul. Nuestros asesores te guiarán en todo el proceso.</p>
          
          <button 
            onClick={navegarACatalogo}
            className="px-10 py-4 bg-red-600 rounded-sm font-medium text-white uppercase tracking-wider text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
          >
            Explorar Catálogo
          </button>
          

        </div>
      </section>

      <Footer />
      {/* Estado de conexión oculto para desarrollo */}
      <div className="hidden">
        <pre>Conexión a Base de datos: {respuesta}</pre>
      </div>
    </div>
  );
}
