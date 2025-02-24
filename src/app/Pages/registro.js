

import React, { useState } from 'react';


export default function registro(username, password) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

        return (
            <div>
                <h1>Registro de Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Registrar</button>
                </form>
                {message && <p>{message}</p>}
            </div>
           
        );
    
}