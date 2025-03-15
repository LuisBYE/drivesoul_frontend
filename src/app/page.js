'use client'; 
import React from 'react';
import Menu from './component/Pages/menu';
import { useState, useEffect } from 'react';
import Vlogin from './Pages/Registro/Vlogin';
import axios from 'axios';


export default function Home() {
    const [ respuesta , setRespueta] = useState('');
    // useEffect(() => {
    //     axios.get('http://localhost:5003/api/DatabaseTest')
    //         .then(response => {
    //           setRespueta(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             setRespueta(error);
    //             console.log(error);
    //         });
    // }, []); 

    return (
        <div>
              <pre> Repsuesta de coneccion de Backend - BBDD{respuesta } </pre> 
            <Menu />
           <Vlogin/>
          

        </div>
    );
}
