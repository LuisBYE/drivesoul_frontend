import FuncionesAdminForm from "../../component/Pages/formulario";
import React, { useEffect, useState } from "react";
import CardProducto from "../../component/Pages/Admin/CardProductos";
import ReqProductos from "../../component/AxiosResquestAll/RequestsProductos"; // Asegúrate de que la ruta sea correcta

export default function FormProductos() {
  const [optionProducto, setOptionProducto] = useState();
  const [productos, setProductos] = useState();

  const addProduct = optionProducto === "Agregar Producto";
  const verProduct = optionProducto === "Ver Producto";

  const agregarProductos = async (formData) => {
    console.log("Datos del formulario antes:", formData);
    const response = await ReqProductos.postProductos(formData);

    if (response.success) {
      //! AQUI AÑADIR UN POPUP CON EL MENSAJE
      alert("Producto agregado correctamente");
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  const listarProductos = async () => {
    const productos = await ReqProductos.getProductos();
    setProductos(productos);
  };

  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="panelFunciones">
          <button
            className="boton_funciones"
            onClick={() => setOptionProducto("Agregar Producto")}
          >
            Agregar Producto
          </button>

          <button
            className="boton_funciones"
            onClick={() => setOptionProducto("Ver Producto")}
          >
            Ver Producto
          </button>
        </div>

        <FuncionesAdminForm
          imputValue={["id", "Nombre", "Descripcion", "Precio", "Categoria"]}
          onSubmit={(data) => agregarProductos(data)}
          display={addProduct ? "" : "none"}
          titlePage="Agrega tu Producto"
          nameButton="Crear Producto"
        />
        {verProduct && <CardProducto productos={productos} />}
      </div>

      <style jsx>{`
        .panelFunciones {
          background: linear-gradient(
            135deg,
            #4facfe,
            rgb(150, 236, 251)
          ); /* Celeste intenso */
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .boton_funciones {
          padding: 12px 25px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #ffffff;
          background-color: rgb(33, 105, 193); /* Azul intenso */
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .boton_funciones:hover {
          background-color: rgb(1, 93, 197); /* Azul más oscuro */
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .funcionesAdmin {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .panelFunciones {
            flex-direction: column;
            align-items: center;
          }

          .boton_funciones {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
