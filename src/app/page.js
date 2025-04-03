'use client'
import React from 'react';
import axios from 'axios';
import NavegadorPag from "./component/Pages/Menu/Navegador"


export default function Home() {

    const [respuesta, setRespuesta] = React.useState("");

    React.useEffect(() => {
        axios.get('http://localhost:5138/api/DatabaseTest')
            .then((response) => {
                //todo:  setRespuesta(response.data.message || JSON.stringify(response.data));
                setRespuesta("Coneccion exitosa");
            })
            .catch((error) => {
                alert("Conexión fallida");
                console.log(error.message);
                setRespuesta(error.message);
            });
    }, []);


    return (
        <div>
           <NavegadorPag/>
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
            <pre> Coneccion a Base de datos :  {respuesta}</pre>
        </div>
    );
}
