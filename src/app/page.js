'use client'
import React from 'react';
import Menu from './component/Pages/menu';
import axios from 'axios';


export default function Home() {

    const [respuesta, setRespuesta] = React.useState("");

    React.useEffect(() => {
        axios.get('http://localhost:5138/api/DatabaseTest')
            .then((response) => {
                setRespuesta(response.data.message || JSON.stringify(response.data));
            })
            .catch((error) => {
                alert("Conexión fallida");
                console.log(error.message);
                setRespuesta(error.message);
            });
    }, []);


    return (
        <div>
            <Menu />
            <pre> Respuesta de conexión de Backend  {respuesta} </pre> 
           
        </div>
    );
}
