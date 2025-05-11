"use client";
import React from "react";
import FuncionesAdminForm from "../../../../component/Pages/formulario";
import ReqProductos from "../../../../component/AxiosResquestAll/RequestsProductos";
import NavegadorPag from "../../../../component/Pages/Menu/Navegador";

export default function EditarProductoPag({ params }) {
  const [id, setId] = React.useState(null);
  const [producto, setProducto] = React.useState();

  React.useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  React.useEffect(() => {
    if (id) {
      fetchProducto();
    }
  }, [id]);

  const actualizarProducto = async (id, formData) => {
    console.log("Datos del formulario antes:", formData);

    const filledFormData = {
      nombre: formData.nombre === "" ? producto?.nombre : formData.nombre,
      descripcion:
        formData.descripcion === ""
          ? producto?.descripcion
          : formData.descripcion,
      precio:
        formData.precio === "" ? producto?.precio : parseFloat(formData.precio),
      categoria:
        formData.categoria === "" ? producto?.categoria : formData.categoria,
    };

    try {
      const response = await ReqProductos.updateProducto(id, filledFormData);
      console.log("Respuesta de la API:", response);

      if (response) {
        await fetchProducto();
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert(
        "Error: " +
          (error.response?.data?.mensaje ||
            "No se pudo actualizar el producto.")
      );
    }
  };
  const fetchProducto = async () => {
    try {
      const response = await ReqProductos.getProductoById(id);
      if (response) {
        setProducto(response);
        console.log("Producto obtenido:", response);
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  return (
    <div>
      <NavegadorPag />
      <div className="editar-producto-container">
        <div className="view-datos-producto">
          <img
            src="/api/files/a87f5f05-a25a-4e22-8f18-520dd5738bab.png"
            alt="Imagen del producto"
            className="editar-producto-imagen"
          />
          <p className="producto-info">
            <strong>ID del producto:</strong> {id}
          </p>
          <p className="producto-info">
            <strong>Nombre:</strong> {producto?.nombre}
          </p>
          <p className="producto-info">
            <strong>Descripción:</strong> {producto?.descripcion}
          </p>
          <p className="producto-info">
            <strong>Precio:</strong> €{producto?.precio}
          </p>
          <p className="producto-info">
            <strong>Categoría:</strong> {producto?.categoria}
          </p>
        </div>

        <div className="editar-producto-card">
          <FuncionesAdminForm
            imputValue={["nombre", "descripcion", "precio", "categoria"]}
            nameButton="Actualizar Producto"
            onSubmit={(formData) => actualizarProducto(id, formData)}
            titlePage="Editar Producto"
            defaultValues={{
              nombre: producto?.nombre,
              descripcion: producto?.descripcion,
              precio: producto?.precio,
              categoria: producto?.categoria,
            }}
          />
        </div>

        <style jsx>{`
          .editar-producto-container {
            margin-top: 91px;
          }

          .view-datos-producto {
            background-color: #1e272e;
            color: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 15px;
          }

          .editar-producto-title {
            font-size: 2rem;
            text-align: center;
            color: #00cec9;
            margin-bottom: 20px;
            width: 100%;
          }

          .editar-producto-imagen {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid #00cec9;
            margin: 0 auto;
            display: block;
          }

          .producto-info {
            flex: 1 1 calc(33.333% - 10px);
            font-size: 1.2rem;
            padding: 10px;
            background-color: #2f3640;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .producto-info strong {
            display: block;
            font-size: 1rem;
            margin-bottom: 5px;
            color: #00cec9;
          }

          @media (max-width: 768px) {
            .view-datos-producto {
              flex-direction: column;
              align-items: center;
            }

            .producto-info {
              flex: 1 1 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
