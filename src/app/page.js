'use client'
import React from 'react';
import Menu from './component/Pages/menu';
import Vlogin from './Pages/Registro/Vlogin';
import axios from 'axios';


export default function Home() {

    const [respuesta, setRespuesta] = React.useState("");

    React.useEffect(() => {
        axios.get('http://localhost:5138/api/DatabaseTest')
            .then((response) => {
                setRespuesta(response.data);
                alert("Conexión exitosa");
            })
            .catch((error) => {
                alert("Conexión fallida");
                console.log(error);
                setRespuesta(error);
            });
    }, []);

    return (
        <div>
            <Menu />
            <pre> Respuesta : { JSON.stringify(respuesta,null,2)} </pre>
           
        </div>
    );
}
