import FuncionesAdminForm from "../../component/Pages/formulario";
import React, { useEffect, useState } from "react";
import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
export default function FomUsuarios() {
    const [optionUsuario, setOptionUsuario] = useState();
    const [usuarios, setUsuarios] = useState();

    const addUser = optionUsuario === "Agregar Usuario" && true;
    const deleteUser = optionUsuario === "Eliminar Usuario" && true;
    const editUser = optionUsuario === "Editar Usuario" && true;

    const agregarUsuarios = async () => {
        // Lógica para manejar usuarios  async
        alert("Función de agregar usuario async");
        // const usuarioCreado = await ReqUsuarios.postUsuarios()

    }
    const listarUsuarios = async () => {
        alert("Función de listar usuarios async")

        const usuarios = await ReqUsuarios.getUsuarios()
        setUsuarios(usuarios)
    }


    useEffect(() => {
        if (optionUsuario === "Agregar Usuario") {

            setUsuarios("")
            agregarUsuarios()
        } else if (optionUsuario === "Eliminar Usuario") {
            setUsuarios("")
        } else if (optionUsuario === "Editar Usuario") {
            listarUsuarios()
        }
    }
        , [optionUsuario]) // Se ejecuta cada vez que cambia el optionUsuario

    return (
        <>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <pre> {JSON.stringify(usuarios, null, 2)}</pre>
                <h1 style={{ fontSize: "3rem", color: "#333" }}>Página de Administración</h1>
                <div className="panelFunciones">
                    <h2 style={{ fontSize: "2rem", color: "#333" }}>Funciones de Usuario</h2>
                    <button className="boton_funciones" onClick={() => setOptionUsuario("Agregar Usuario")}>Agregar Usuario</button>
                    <button className="boton_funciones" onClick={() => setOptionUsuario("Eliminar Usuario")}>Eliminar Usuario</button>
                    <button className="boton_funciones" onClick={() => setOptionUsuario("Editar Usuario")}>Editar Usuario</button>
                    <button className="boton_funciones" onClick={() => setOptionUsuario("Ver Usuarios")}>Ver Usuarios</button>
                </div>
                <div className="funcionesAdmin" >
                    <FuncionesAdminForm
                        imputValue={["nombre", "apellido", "email", "telefono", "Contraseña", "Ciudad","rol"]}
                        onClick={() => usuarios()}
                        display={addUser ? "" : "none"}
                        titlePage="Agregar Usuario"
                    />

                    <FuncionesAdminForm
                        imputValue={["nombre", "apellido", "email", "telefono", "Contraseña", "Ciudad"]}
                        onClick={() => usuarios()}
                        titlePage="Eliminar Usuario"
                        display={deleteUser ? "" : "none"}
                    />
                    <FuncionesAdminForm
                        imputValue={["nombre", "apellido", "email", "telefono", "Contraseña", "Ciudad"]}
                        onClick={() => usuarios()}
                        titlePage="Editar Usuario"
                        display={editUser ? "" : "none"}
                    />

                </div>

            </div>

            <style jsx>{`
                .panelFunciones {
                    background-color:rgb(144, 141, 141);
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                    .boton_funciones{
                    margin: 10px;
                    padding: 10px 20px;
                    font-size: 1.2rem;
                    background-color:rgb(171, 180, 251);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    }
            `}</style>


        </>

    )


}