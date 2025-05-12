"use client";
import React from "react";
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import "./noticias.css";


export default function Noticias() {
    return (
      <>
        <NavegadorMenu /> {}
  
        <div className="noticias-container">
          {/* TÍTULO PRINCIPAL */}
          <div className="titulo-container">
            <h1 className="titulo">NOTICIAS DEL MOTOR</h1>
          </div>


          {/* SEGUNDO BLOQUE */}
        <section className="noticias-bloque" style={{ backgroundImage: "url('/FOTOS/NOTICIAS_MOT2.jpg')" }}>
          <h2 className="subtitulo">GUÍAS DE COMPRA</h2>
          <p className="descripcion">Analizamos los coches más populares del mercado, con todas nuestras opiniones y video.</p>
          <div className="videos-container">
            <iframe src="https://www.youtube.com/embed/p4_-CXCnoNI" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/aOSb7gxgy_8" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/O00OjUJ3f1I" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/IdXp0Yc5szk" allowFullScreen></iframe>
          </div>
        </section>
  
         {/* PRIMER BLOQUE */}
        <section className="noticias-bloque" style={{ backgroundImage: "url('/FOTOS/NOTICIAS_MOT1.jpg')" }}>
          <h2 className="subtitulo">TE RECOMENDAMOS</h2>
          <p className="descripcion">Desde Autopista destacamos los siguientes temas:</p>
          <div className="videos-container">
            <iframe src="https://www.youtube.com/embed/GXBVFlXpFrE" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/dhKt6SzetGk" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/fVzPOXs5niA" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/g7Ex1HmBlj8" allowFullScreen></iframe>
          </div>
        </section>

        
      </div>
      <Footer />
    </>
  );
}