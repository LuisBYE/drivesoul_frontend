"use client";

import React, { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import NavegadorMenu from "../../../component/Pages/Menu/Navegador";
import { obtenerGradiente } from "../../../Utils/Coches/coloresCoches";
import { useCart } from "../../../context/CartContext";
import RequestsCarrito from "../../../component/AxiosResquestAll/RequestsCarrito";
import RequestsCoches from "../../../component/AxiosResquestAll/RequestsCoches";

import "./detalles.css";

export default function DetallesCoche() {
  const router = useRouter();
  const cocheData = localStorage.getItem("cocheSeleccionado");
  const cocheSeleccionado = cocheData ? [JSON.parse(cocheData)] : [];
  const [images, setImages] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const volverACatalogo = () => {
    //* Usar window.location.href para forzar una recarga completa
    window.location.href = "/Pages/Catalogo";
  };
  const user = localStorage.getItem("user");

  const userData = user ? JSON.parse(user) : null;
  const enviarACarrito = async () => {
    if (!user) {
      router.push("/Pages/Registro");
      return;
    }
    const params = {
      UsuarioId: userData?.id,
      ProductoId: cocheSeleccionado[0]?.producto_id,
      Cantidad: 1,
    };
    const resultado = await RequestsCarrito.addItemToCart(params);
    if (resultado) {
      setAddedToCart(true);
      alert("Coche añadido al carrito correctamente");
      router.push("/Pages/cart"); // Esto te lleva a la cesta
    }
  };

  return (
    <div className="detalles-container">
      <NavegadorMenu />
      <div className="detalles-page">
        <div className="hero-section">
          {!cocheData ? (
            // CONTROL DE ERRORES
            <div className="placeholder-estado">
              <div className="mensaje">
                {!loaded ? (
                  <pre style={{ color: "red", width: "100px" }}>
                    {" "}
                    cargando {JSON.stringify(cocheData, null, 2)}{" "}
                  </pre>
                ) : (
                  "No se encontró información del vehículo"
                )}
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
              {/* <pre> {JSON.stringify(cocheSeleccionado, null, 2)}</pre> */}
              <div className="imagen-container">
                <div className="imagen-wrapper">
                  {cocheSeleccionado[0].imagenes &&
                  cocheSeleccionado[0].imagenes.length > 0 ? (
                    <img
                      src={`/FOTOS/COCHES/${cocheSeleccionado[0].imagenes[currentImageIndex]}`}
                      alt={`${cocheSeleccionado[0].nombre} - Imagen ${
                        currentImageIndex + 1
                      }`}
                      className="imagen-principal"
                      loading="eager"
                    />
                  ) : (
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <img
                        src="/FOTOS/COCHES/default.jpg"
                        alt="No hay imágenes para este coche"
                        className="imagen-principal"
                        loading="eager"
                      />
                      <div style={{ color: "#888", marginTop: 8 }}>
                        No hay imágenes para este coche
                      </div>
                    </div>
                  )}
                </div>

                {cocheSeleccionado[0].imagenes &&
                  cocheSeleccionado[0].imagenes.length > 0 && (
                    <>
                      <div className="carousel-controls">
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev -
                                  1 +
                                  cocheSeleccionado[0].imagenes.length) %
                                cocheSeleccionado[0].imagenes.length
                            )
                          }
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex(
                              (prev) =>
                                (prev + 1) %
                                cocheSeleccionado[0].imagenes.length
                            )
                          }
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>

                      <div className="thumbnail-container">
                        {cocheSeleccionado[0].imagenes.map((img, index) => (
                          <div
                            key={index}
                            className={`thumbnail ${
                              index === currentImageIndex ? "active" : ""
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <img
                              src={`/FOTOS/COCHES/${img}`}
                              alt={`Miniatura ${index + 1}`}
                              loading="eager"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                {cocheSeleccionado[0]?.tipo_combustible?.toLowerCase() ===
                  "híbrido" && <div className="eco-badge">ECO</div>}
              </div>

              <div
                className="info-container"
                style={{
                  background: obtenerGradiente(cocheSeleccionado[0].color)
                    .fondo,
                }}
              >
                <div className="info-header">
                  <h1 className="titulo-coche">
                    {cocheSeleccionado[0].nombre}
                  </h1>
                  <button onClick={volverACatalogo} className="btn-catalogo">
                    Catálogo
                  </button>
                  <div className="precio-info">
                    {cocheSeleccionado[0].en_oferta ? (
                      <>
                        <div className="precio-oferta">
                          <span
                            className="precio-original"
                            style={{
                              textDecoration: "line-through",
                              color: "#999",
                              fontSize: "0.9em",
                            }}
                          >
                            {cocheSeleccionado[0].precioOriginal
                              ? cocheSeleccionado[0].precioOriginal.toLocaleString(
                                  "es-ES"
                                )
                              : cocheSeleccionado[0].precio
                              ? cocheSeleccionado[0].precio.toLocaleString(
                                  "es-ES"
                                )
                              : "0"}{" "}
                            €
                          </span>
                          <div
                            className="precio-actual"
                            style={{ color: "#ff3a3a", fontWeight: "bold" }}
                          >
                            {cocheSeleccionado[0].precio
                              ? cocheSeleccionado[0].precio.toLocaleString(
                                  "es-ES"
                                )
                              : "0"}{" "}
                            €
                          </div>
                        </div>
                        <div className="precio-mensual">
                          Desde{" "}
                          {Math.round(
                            (cocheSeleccionado[0].precio || 0) / 72
                          ).toLocaleString("es-ES")}{" "}
                          €/mes*
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="precio-actual"
                          style={{
                            color: obtenerGradiente(cocheSeleccionado[0].color)
                              .acento,
                          }}
                        >
                          {cocheSeleccionado[0].precio
                            ? cocheSeleccionado[0].precio.toLocaleString(
                                "es-ES"
                              )
                            : "0"}{" "}
                          €
                        </div>
                        <div className="precio-mensual">
                          Desde{" "}
                          {Math.round(
                            (cocheSeleccionado[0].precio || 0) / 72
                          ).toLocaleString("es-ES")}{" "}
                          €/mes*
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="specs-grid">
                  {[
                    {
                      icon: "calendar-alt",
                      label: "Año",
                      value: cocheSeleccionado[0].anio || "2023",
                    },
                    {
                      icon: "road",
                      label: "Kilómetros",
                      value: `${
                        cocheSeleccionado[0].kilometraje
                          ? cocheSeleccionado[0].kilometraje.toLocaleString(
                              "es-ES"
                            )
                          : "0"
                      } km`,
                    },
                    {
                      icon: "gas-pump",
                      label: "Combustible",
                      value:
                        cocheSeleccionado[0].tipo_combustible || "Gasolina",
                    },
                    {
                      icon: "cog",
                      label: "Transmisión",
                      value: cocheSeleccionado[0].transmision || "Automático",
                    },
                    {
                      icon: "palette",
                      label: "Color",
                      value: cocheSeleccionado[0].color || "No especificado",
                    },
                    {
                      icon: "bolt",
                      label: "Potencia",
                      value: cocheSeleccionado[0].potencia || "150 CV",
                    },
                    {
                      icon: "gauge-high",
                      label: "Velocidad Máx.",
                      value:
                        cocheSeleccionado[0].velocidad_maxima || "200 km/h",
                    },
                    {
                      icon: "gas-pump",
                      label: "Consumo",
                      value: cocheSeleccionado[0].consumo || "6.5 L/100km",
                    },
                  ].map((spec, index) => (
                    <div key={index} className="spec-item">
                      <div
                        className="spec-icon"
                        style={{
                          background: obtenerGradiente(
                            cocheSeleccionado[0].color
                          ).acento,
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
                    background: obtenerGradiente(cocheSeleccionado[0].color)
                      .acento,
                  }}
                  onClick={() => {
                    // handleAddToCart(),
                    enviarACarrito();
                  }}
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
