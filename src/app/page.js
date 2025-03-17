'use client'
import React from 'react';
import Menu from './component/Pages/menu';
import axios from 'axios';


export default function Home() {

    const [respuesta, setRespuesta] = React.useState("");

    React.useEffect(() => {
        axios.get('http://localhost:5138/api/DatabaseTest')
            .then((response) => {
                setRespuesta(response.data);
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
           
           
        </div>
    );
}
