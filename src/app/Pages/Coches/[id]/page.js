"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NavegadorMenu from "../../../component/Pages/Menu/Navegador";
import { obtenerGradiente } from "../../../Utils/Coches/coloresCoches";
import { useCart } from "../../../context/CartContext";
import "./detalles.css";

export default function DetallesCoche() {
  const params = useParams();
  const router = useRouter();
  const [coche, setCoche] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // OBTIENE IMAGENES SEGÚN EL ID DEL COCHE
  const getImagenesCoche = (modelo_id) => {
    const rutasBase = {
      1: "SEATIBIZAROJO",
      2: "HYUNDAII30NFASTBACK",
      90: "SEATLEONBLANCO",
      91: "SEATARONAAZUL",
      92: "HYUNDAITUCSONGRIS",
      93: "HYUNDAIKONA",
      94: "AUDIA3NEGRO",
      95: "AUDIA4AZUL",
      96: "AUDIQ5BLANCO",
      97: "VOLKSWAGENGOLFGRIS",
      98: "VOLKSWAGENPOLOROJO",
      99: "VOLKSWAGENTROCNEGRO",
      100: "PEUGEOT208AZUL",
      101: "PEUGEOT3008BLANCO",
      102: "PEUGEOT508GRIS2023",
      103: "MERCEDESCLASEANEGRO",
      104: "MERCEDESCLASECROJO",
      105: "MERCEDES GLCAZUL",
    };

    const extensiones = {
      1: [".jpg", ".jpg", ".webp", ".png"],
      2: [".png", ".png", ".png", ".png"],
      90: [".jpg", ".jpg", ".jpg", ".jpg"],
      91: [".png", ".png", ".png", ".png"],
      92: [".png", ".png", ".png", ".png"],
      93: [".jpg", ".jpg", ".png", ".jpg"],
      94: [".png", ".png", ".png", ".png"],
      95: [".png", ".png", ".png", ".png"],
      96: [".png", ".png", ".png", ".png"],
      97: [".png", ".png", ".png", ".png"],
      98: [".png", ".png", ".png", ".png"],
      99: [".png", ".png", ".png", ".png"],
      100: [".png", ".png", ".png", ".png"],
      101: [".png", ".png", ".png", ".png"],
      102: [".png", ".png", ".png", ".png"],
      103: [".png", ".png", ".png", ".png"],
      104: [".jpeg", ".jpeg", ".jpeg", ".png"],
      105: [".png", ".png", ".png", ".png"],
    };

    if (!rutasBase[modelo_id]) return ["/FOTOS/COCHES/default.jpg"];

    return [1, 2, 3, 4].map(
      (num, index) =>
        `/FOTOS/COCHES/${rutasBase[modelo_id]}/${num}${extensiones[modelo_id][index]}`
    );
  };

  // OBTIENE LA PRIMERA IMAGEN DEL COCHE
  const getImagenCoche = (modelo_id) => {
    const imagenes = getImagenesCoche(modelo_id);
    return imagenes[0] || "/FOTOS/COCHES/default.jpg";
  };

  // RECARGA LAS IMAGENES
  const precargarImagenes = async (imagenes) => {
    const promesas = imagenes.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    });

    await Promise.all(promesas);
    setImagesLoaded(true);
  };

  // LO INICIA Y LIMPIA LOS MARCADORES DE NAVEGACION
  useEffect(() => {
    sessionStorage.removeItem("vieneDePagina");
    sessionStorage.removeItem("ultimaNavegacion");

    window.scrollTo(0, 0);
  }, []);

  // CARGA DE DATOS DEL COCHE
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoaded(false);
        setImagesLoaded(false);
        const cocheData = localStorage.getItem("cocheSeleccionado");

        if (cocheData) {
          const parsedCoche = JSON.parse(cocheData);
          setCoche(parsedCoche);

          const imagenesDelCoche = getImagenesCoche(parsedCoche.modelo_id);
          setImages(imagenesDelCoche);
          await precargarImagenes(imagenesDelCoche);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error al cargar los datos del coche:", error);
        setLoaded(true);
      }
    };

    cargarDatos();
  }, [params.id]);

  // CONTROL DE CARRUSEL DE IMAGENES
  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [images]);

  // FUNCION QUE VUELVE AL CATALOGO
  const volverACatalogo = () => {
    router.push("/Pages/Catalogo");
  };

  /* FUNCIÓN PARA AÑADIR AL CARRITO
   * ESTA FUNCIÓN SE ENCARGA DE AÑADIR UN PRODUCTO AL CARRITO
   * UTILIZANDO LA FUNCIÓN addToCart DEL CONTEXTO
   */
  const handleAddToCart = () => {
    // VERIFICAR AUTENTICACIÓN
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/Pages/cart");
      return;
    }

    // VERIFICAR QUE TENEMOS DATOS DEL COCHE
    if (!coche || !coche.modelo_id) {
      console.error("Error: No hay datos del coche para añadir al carrito");
      return;
    }

    // OBTENER NOMBRE REAL DEL COCHE SEGÚN MODELO_ID
    const getNombreCoche = (modelo_id) => {
      const nombresCoches = {
        1: "Seat Ibiza",
        2: "Hyundai i30 N Fastback",
        3: "Seat Leon",
        4: "Seat Arona",
        90: "Seat Leon",
        91: "Seat Arona",
        92: "Hyundai Tucson",
        93: "Hyundai Kona",
        94: "Audi A3",
        95: "Audi A4",
        96: "Audi Q5",
        97: "Volkswagen Golf",
        98: "Volkswagen Polo",
        99: "Volkswagen T-Roc",
        100: "Peugeot 208",
        101: "Peugeot 3008",
        102: "Peugeot 508",
        103: "Mercedes Clase A",
        104: "Mercedes Clase C",
        105: "Mercedes GLC",
      };
      return nombresCoches[modelo_id] || `Coche ${modelo_id}`;
    };

    // OBTENER MARCA DEL COCHE SEGÚN MODELO_ID
    const getMarcaCoche = (modelo_id) => {
      const marcasCoches = {
        1: "Seat",
        2: "Hyundai",
        3: "Seat",
        4: "Seat",
        90: "Seat",
        91: "Seat",
        92: "Hyundai",
        93: "Hyundai",
        94: "Audi",
        95: "Audi",
        96: "Audi",
        97: "Volkswagen",
        98: "Volkswagen",
        99: "Volkswagen",
        100: "Peugeot",
        101: "Peugeot",
        102: "Peugeot",
        103: "Mercedes",
        104: "Mercedes",
        105: "Mercedes",
      };
      return marcasCoches[modelo_id] || "Marca";
    };

    // OBTENER MODELO DEL COCHE SEGÚN MODELO_ID
    const getModeloCoche = (modelo_id) => {
      const modelosCoches = {
        1: "Ibiza",
        2: "i30 N Fastback",
        3: "Leon",
        4: "Arona",
        90: "Leon",
        91: "Arona",
        92: "Tucson",
        93: "Kona",
        94: "A3",
        95: "A4",
        96: "Q5",
        97: "Golf",
        98: "Polo",
        99: "T-Roc",
        100: "208",
        101: "3008",
        102: "508",
        103: "Clase A",
        104: "Clase C",
        105: "GLC",
      };
      return modelosCoches[modelo_id] || "Modelo";
    };

    // PREPARAR DATOS DEL COCHE CON VALORES REALES
    const cocheParaCarrito = {
      id: coche.modelo_id,
      modelo_id: coche.modelo_id,
      marca: coche.marca || getMarcaCoche(coche.modelo_id),
      modelo: coche.modelo || getModeloCoche(coche.modelo_id),
      nombre: coche.nombre || getNombreCoche(coche.modelo_id),
      precio: coche.precio || 0,
      anio: coche.anio || coche.año || "2023",
      color: coche.color || "No especificado",
      tipo_combustible:
        coche.tipo_combustible || coche.combustible || "Gasolina",
      imagen: getImagenCoche(coche.modelo_id),
    };

    // MOSTRAR MENSAJE DE CONFIRMACIÓN
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    // USAR LA FUNCIÓN DEL CONTEXTO PARA AÑADIR AL CARRITO
    // ESTA FUNCIÓN YA SE ENCARGA DE TODO: ACTUALIZAR ESTADO, LOCALSTORAGE Y REDIRECCIONAR
    addToCart(cocheParaCarrito);
  };

  const enviarACarrito = () => {
    alert("El coche ha sido añadido al carrito base de datos POST ");
  };

  // LAYAUT
  return (
    <div className="detalles-container">
      <NavegadorMenu />
      <div className="detalles-page">
        <div className="hero-section">
          {!loaded || !coche ? (
            // CONTROL DE ERRORES
            <div className="placeholder-estado">
              <div className="mensaje">
                {!loaded
                  ? "Cargando..."
                  : "No se encontró información del vehículo"}
              </div>
              {!loaded ? null : (
                <button onClick={volverACatalogo} className="btn-catalogo">
                  Volver al Catálogo
                </button>
              )}
            </div>
          ) : (
            // CONTENIDO DEL COCHE
            <>
              <div className="imagen-container">
                <div className="imagen-wrapper">
                  {imagesLoaded && (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${coche.nombre} - Imagen ${currentImageIndex + 1}`}
                      className="imagen-principal"
                      loading="eager"
                    />
                  )}
                </div>

                <div className="carousel-controls">
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev + 1) % images.length)
                    }
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>

                <div className="thumbnail-container">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${index + 1}`}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>

                {coche.tipo_combustible.toLowerCase() === "híbrido" && (
                  <div className="eco-badge">ECO</div>
                )}
              </div>

              <div
                className="info-container"
                style={{ background: obtenerGradiente(coche.color).fondo }}
              >
                <div className="info-header">
                  <h1 className="titulo-coche">{coche.nombre}</h1>
                  <button onClick={volverACatalogo} className="btn-catalogo">
                    Catálogo
                  </button>
                  <div className="precio-info">
                    <div
                      className="precio-actual"
                      style={{ color: obtenerGradiente(coche.color).acento }}
                    >
                      {coche.precio.toLocaleString("es-ES")} €
                    </div>
                    <div className="precio-mensual">
                      Desde{" "}
                      {Math.round(coche.precio / 72).toLocaleString("es-ES")}{" "}
                      €/mes*
                    </div>
                  </div>
                </div>

                <div className="specs-grid">
                  {[
                    { icon: "calendar-alt", label: "Año", value: coche.anio },
                    {
                      icon: "road",
                      label: "Kilómetros",
                      value: `${coche.kilometraje.toLocaleString("es-ES")} km`,
                    },
                    {
                      icon: "gas-pump",
                      label: "Combustible",
                      value: coche.tipo_combustible,
                    },
                    {
                      icon: "cog",
                      label: "Transmisión",
                      value: coche.transmision,
                    },
                    { icon: "palette", label: "Color", value: coche.color },
                    {
                      icon: "car",
                      label: "Estado",
                      value: coche.kilometraje === 0 ? "Nuevo" : "Usado",
                    },
                  ].map((spec, index) => (
                    <div key={index} className="spec-item">
                      <div
                        className="spec-icon"
                        style={{
                          background: obtenerGradiente(coche.color).acento,
                        }}
                      >
                        <i className={`fas fa-${spec.icon}`}></i>
                      </div>
                      <div className="spec-content">
                        <span className="spec-label">{spec.label}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-interesa"
                  style={{
                    background: obtenerGradiente(coche.color).acento,
                  }}
                  onClick={() => {
                    handleAddToCart(), enviarACarrito();
                  }}
                  disabled={addedToCart}
                >
                  {addedToCart ? "¡Añadido al carrito!" : "Añadir al carrito"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
