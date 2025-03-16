

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ReqUsuarios from '@/app/component/AxiosResquestAll/RequestsUsuarios';

const Req = async (username, password) => {
    let user = {
        username: username,

        password: password
    };

    let response = await ReqUsuarios.postUsuarios(user);
    return response;
}


export default function registro(username, password) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

        return (
            <div>
                <h1>Registro de Usuario</h1>
                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="NombreUsuario"
                        // value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Telefono"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     <input
                        type="text"
                        placeholder="Ciudad"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/*_______ESTE INPUT SERA CUANDO EL CLIENTE SEA ADMINISTRADOR // AUN NO ESTA IMPLEMENTADO_____ */}

                     {/* <input
                        type="text"
                        placeholder="Rol"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> */}
                     
                    <button type="submit">Registrar</button>
                </Form>
                {message && <p>{message}</p>}
            </div>
           
        );
    
}