"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavegadorPag from "./component/Pages/Menu/Navegador";
import Footer from "./component/footer";
import ReqCoches from "./component/AxiosResquestAll/RequestsCoches";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CardCochesSimple from "./component/CardCochesSimple";

export default function Home() {
  const [respuesta, setRespuesta] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const [presupuestoMax, setPresupuestoMax] = useState(30000);
  const [tipoCoche, setTipoCoche] = useState("SUV");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [noticias, setNoticias] = useState([]);
  const scrollRef = useRef(null);
  const configuradorRef = useRef(null);
  const noticiasRef = useRef(null);
  const contactoRef = useRef(null);
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
  
  // Función para navegar a las diferentes secciones
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Función para buscar coches según configuración
  const buscarCoches = () => {
    router.push(`/Pages/Catalogo?presupuesto=${presupuestoMax}&tipo=${tipoCoche}`);
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", { nombre, email, telefono, mensaje });
    setEnviado(true);
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setNombre("");
      setEmail("");
      setTelefono("");
      setMensaje("");
      setEnviado(false);
    }, 3000);
  };
  
  // Inicializar noticias
  useEffect(() => {
    const noticiasData = [
      {
        id: 1,
        titulo: "Hyundai IONIQ 5: La revolución eléctrica",
        resumen: "Descubre el nuevo Hyundai IONIQ 5, un vehículo eléctrico que redefine el concepto de movilidad sostenible.",
        fecha: "15 Mayo 2025",
        imagen: "/FOTOS/COCHES/HYUNDAIKONA/1.jpg",
        enlace: "/Pages/Noticias/DetalleHyundaiIoniq"
      },
      {
        id: 2,
        titulo: "Mercedes-Benz presenta su nueva línea de vehículos híbridos",
        resumen: "La marca alemana apuesta por la tecnología híbrida en su nueva gama de vehículos de lujo.",
        fecha: "10 Mayo 2025",
        imagen: "/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpeg",
        enlace: "/Pages/Noticias/DetalleMercedesBenz"
      },
      {
        id: 3,
        titulo: "Toyota Corolla 2025: Tradición y tecnología",
        resumen: "El modelo más vendido de la historia se renueva con un diseño más moderno y tecnología de vanguardia.",
        fecha: "5 Mayo 2025",
        imagen: "/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.png",
        enlace: "/Pages/Noticias/DetalleToyotaCorolla"
      }
    ];
    
    setNoticias(noticiasData);
  }, []);

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
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="text-white">DRIVE</span>
            <span className="text-red-600 relative">
              SOUL
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-800"></span>
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 mb-12 font-light tracking-wide">Descubre la pasión por conducir</p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <button 
              onClick={navegarACatalogo}
              className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-700/30 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              EXPLORAR VEHÍCULOS
            </button>
            <button 
              onClick={() => scrollToSection(contactoRef)}
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2"
            >
              CONTACTAR
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">
            <span className="text-white">Productos </span>
            <span className="text-red-600 inline-block relative">
              Destacados
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-800"></span>
            </span>
          </h2>
          <p className="text-gray-300 text-xl text-center max-w-2xl mx-auto mb-12">Descubre nuestra selección de vehículos de alta gama diseñados para satisfacer tus expectativas</p>
          
          {productos.length > 0 ? (
            <CardCochesSimple producto={productos} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">Cargando productos destacados...</p>
            </div>
          )}
          
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

      {/* Mini Configurador de Coche */}
      <section ref={configuradorRef} className="py-24 px-4 md:px-8 relative">
        {/* Fondo con degradado y efecto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/15 to-black">
          <div className="absolute inset-0 bg-[url('/FOTOS/COCHES/pattern-bg.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-radial from-red-700/25 via-red-800/15 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/10 via-red-700/15 to-red-800/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-800/5 via-red-700/10 to-transparent"></div>
        </div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-white">Configura tu </span>
              <span className="text-red-600 inline-block relative">
                coche ideal
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-800"></span>
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">Encuentra el vehículo perfecto para ti con nuestro configurador personalizado</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-10 rounded-xl shadow-2xl border border-zinc-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-red-600/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-radial from-red-600/10 via-transparent to-transparent"></div>
                
                <div className="mb-8 relative z-10">
                  <label className="block text-white text-lg mb-3 font-semibold">¿Cuál es tu presupuesto máximo?</label>
                  <select 
                    value={presupuestoMax}
                    onChange={(e) => setPresupuestoMax(e.target.value)}
                    className="w-full bg-zinc-800 text-white py-4 px-5 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300"
                  >
                    <option value="20000">Hasta 20.000 €</option>
                    <option value="30000">Hasta 30.000 €</option>
                    <option value="40000">Hasta 40.000 €</option>
                    <option value="60000">Hasta 60.000 €</option>
                    <option value="100000">Más de 60.000 €</option>
                  </select>
                </div>
                
                <div className="mb-10 relative z-10">
                  <label className="block text-white text-lg mb-3 font-semibold">¿Qué tipo de vehículo buscas?</label>
                  <select 
                    value={tipoCoche}
                    onChange={(e) => setTipoCoche(e.target.value)}
                    className="w-full bg-zinc-800 text-white py-4 px-5 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Urbano">Urbano</option>
                    <option value="Deportivo">Deportivo</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Compacto">Compacto</option>
                    <option value="Berlina">Berlina</option>
                  </select>
                </div>
                
                <button 
                  onClick={buscarCoches}
                  className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-700/30 flex items-center justify-center gap-3 transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar vehículos
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/FOTOS/COCHES/AUDIQ5BLANCO/1.png" 
                  alt="Configura tu coche" 
                  className="w-full h-full object-cover object-center rounded-xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl font-bold text-white mb-3">Coche a medida</h3>
                  <p className="text-gray-200 mb-6 text-lg">Configura cada detalle según tus preferencias</p>
                  <Link 
                    href="/Pages/Coches" 
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-1"
                  >
                    Configurador completo 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      
      {/* Formulario de Contacto */}
      <section ref={contactoRef} className="py-24 px-4 md:px-8 relative">
        {/* Fondo con degradado y efecto */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
          <div className="absolute inset-0 bg-[url('/FOTOS/COCHES/pattern-bg.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent"></div>
        </div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-white">Contacta con </span>
              <span className="text-red-600 inline-block relative">
                nosotros
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-800"></span>
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">¿Tienes alguna pregunta o necesitas más información? Nuestro equipo está listo para ayudarte</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            <div className="w-full md:w-1/2 flex flex-col bg-[#1a1a1a] rounded-xl shadow-2xl border border-zinc-700 overflow-hidden relative">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-radial from-red-600/20 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-red-600/10 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-red-600/5 blur-2xl"></div>
              
              <div className="p-10 relative z-10">
                <div className="relative z-10">
                  <h3 className="text-3xl font-extrabold mb-2 text-white">Ubicación</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-800 mb-10"></div>
                </div>
                
                <div className="flex items-start mb-8 group relative z-10">
                  <div className="bg-gradient-to-br from-red-700 to-red-500 rounded-full p-4 mr-5 shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <p className="text-white text-lg font-semibold mb-1 group-hover:text-red-400 transition-colors duration-300">Carrer del Doctor Aiguader</p>
                    <p className="text-gray-400">Ciutat Vella, 08003 Barcelona, España</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8 group relative z-10">
                  <div className="bg-gradient-to-br from-red-700 to-red-500 rounded-full p-4 mr-5 shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <p className="text-white text-lg font-semibold mb-1 group-hover:text-red-400 transition-colors duration-300">Teléfono</p>
                    <p className="text-gray-400">936 854 874</p>
                  </div>
                </div>
                
                <div className="flex items-start group relative z-10">
                  <div className="bg-gradient-to-br from-red-700 to-red-500 rounded-full p-4 mr-5 shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <p className="text-white text-lg font-semibold mb-1 group-hover:text-red-400 transition-colors duration-300">Email</p>
                    <p className="text-gray-400">drivesould_responde@drivesoul.es</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto relative overflow-hidden">
                <img 
                  src="/FOTOS/concesionario.jpg" 
                  alt="Concesionario DriveSoul" 
                  className="w-full h-80 object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Nuestro concesionario</h3>
                  <p className="text-gray-200">Visítanos y descubre nuestra selección de vehículos</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="bg-[#1a1a1a] p-10 rounded-xl shadow-2xl border border-zinc-700 h-full relative overflow-hidden">
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-radial from-red-600/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-radial from-red-600/10 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-red-600/10 blur-3xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">Envíanos un mensaje</h3>
                  <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-red-800 mb-8"></div>
                </div>
                
                {enviado ? (
                  <div className="bg-green-900/50 border-l-4 border-green-500 text-green-100 p-6 rounded-r-lg mb-8 relative z-10 shadow-lg">
                    <p className="font-bold text-xl mb-2">¡Mensaje enviado correctamente!</p>
                    <p className="text-base">Nos pondremos en contacto contigo lo antes posible.</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white text-lg mb-3 font-semibold">Nombre</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          className="w-full bg-zinc-800/80 text-white py-4 px-5 pl-12 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300"
                          placeholder="Tu nombre"
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white text-lg mb-3 font-semibold">Teléfono</label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          className="w-full bg-zinc-800/80 text-white py-4 px-5 pl-12 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300"
                          placeholder="Tu teléfono"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-white text-lg mb-3 font-semibold">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-800/80 text-white py-4 px-5 pl-12 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300"
                        placeholder="Tu email"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-white text-lg mb-3 font-semibold">Mensaje</label>
                    <div className="relative">
                      <textarea 
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        className="w-full bg-zinc-800/80 text-white py-4 px-5 pl-12 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg transition-all duration-300 min-h-[150px]"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      ></textarea>
                      <div className="absolute left-3 top-8 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-700/30 flex items-center justify-center gap-3 transform hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600/0 via-white/20 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    ENVIAR MENSAJE
                  </button>
                </form>
              </div>
            </div>
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



      <Footer />
      {/* Estado de conexión oculto para desarrollo */}
      <div className="hidden">
        <pre>Conexión a Base de datos: {respuesta}</pre>
      </div>
    </div>
  );
}
