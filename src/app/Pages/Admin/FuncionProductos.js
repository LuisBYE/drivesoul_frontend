import FuncionesAdminForm from "../../component/Pages/formulario";
import React, { useEffect, useState } from "react";
//! PETIOCONES PARA PRODUCTOS
// import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
export default function FormProductos() {
    const [optionProducto, setOptionProducto] = useState();
    const [productos, setProductos] = useState();

    const addProduct = optionProducto === "Agregar Producto" && true;
    const deleteProduct = optionProducto === "Eliminar Producto" && true;
    const editProduct = optionProducto === "Editar Producto" && true;

    const agregarProductos = async () => {
        // Lógica para manejar usuarios  async
        alert("Función de agregar usuario async");


    }
    const listarProductos = async () => {
        alert("Función de listar usuarios async")
        //* PETICION A LA API DE LISTAR PRODUCTOS
        setUsuarios("")
    }


    useEffect(() => {
        if (optionProducto === "Agregar Producto") {

            setProductos("")
        } else if (optionProducto === "Eliminar Producto") {
            setProductos("")

        } else if (optionProducto === "Editar Producto") {
            listarProductos()
        }
    }
        , [optionProducto]) // Se ejecuta cada vez que cambia el optionUsuario

    return (
        <>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <div className="panelFunciones">
                    <h2 style={{ fontSize: "2rem", color: "#333" }}>Funciones de Producto</h2>
                    <button className="boton_funciones" onClick={() => setOptionProducto("Agregar Producto")}>Agregar Producto</button>
                    <button className="boton_funciones" onClick={() => setOptionProducto("Eliminar Producto")}>Eliminar Producto</button>
                    <button className="boton_funciones" onClick={() => setOptionProducto("Editar Producto")}>Editar Producto</button>
                    <button className="boton_funciones" onClick={() => setOptionProducto("Ver Producto")}>Ver Producto</button>
                </div>
                <div className="funcionesAdmin" >
                    <FuncionesAdminForm
                        imputValue={["nombre", "descripcion", "precio", "categoria"]}
                        onClick={() => agregarProductos()}
                        display={addProduct ? "" : "none"}
                        titlePage="Agregar Usuario"
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