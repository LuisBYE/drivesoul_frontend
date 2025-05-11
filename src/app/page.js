"use client";
import React from "react";
import axios from "axios";
import NavegadorPag from "./component/Pages/Menu/Navegador";
import ReqProductos from "./component/AxiosResquestAll/RequestsProductos";
import CardProductos from "./Utils/Pages/CardProductos";
import Footer from "./component/footer";

export default function Home() {
  const [respuesta, setRespuesta] = React.useState("");
  const [productos, setProductos] = React.useState([]);

  const listarProductos = async () => {
    const response = await ReqProductos.getProductos(); // Cambia la URL según tu API
    setProductos(response); // Almacena los productos en el estado
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5138/api/DatabaseTest")
      .then((response) => {
        //todo:  setRespuesta(response.data.message || JSON.stringify(response.data));
        setRespuesta("Coneccion exitosa");
      })
      .catch((error) => {
        alert("Conexión fallida");
        console.log(error.message);
        setRespuesta(error.message);
      });
    listarProductos();
  }, []);

  return (
    <div>
      <NavegadorPag />
      {/* VIDEO BANNER */}
      <div className="hero">
        <video
          className="video-fondo"
          autoPlay
          muted
          loop
          src="/VIDEOS/VIDEOBANNER.mp4"
        />
        <div className="contenido-hero">
          <h2>THE NEW</h2>
          <div className="ix-logo">iX</div>
          <p>Nuevo BMW iX. 100% eléctrico.</p>
          <p>Hasta 701 km de autonomía.</p>
        </div>
      </div>

      <pre> Coneccion a Base de datos : {respuesta}</pre>
      {/* <pre> Producto {JSON.stringify(productos, null, 2)}</pre> */}
      <CardProductos productos={productos} />
      <Footer />
    </div>
  );
}
