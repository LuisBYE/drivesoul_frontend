import React, { useEffect, useState } from "react";
import ReqCoches from "../../component/AxiosResquestAll/RequestsCoches"; //
import CardCoches from "../../Utils/Pages/CardCoches"; // Asegúrate de que la ruta sea correcta

const Productos = () => {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const cochesObtenidos = await ReqCoches.getCoches(); // Llamada a la API
      setCoches(cochesObtenidos);
    };

    fetchProductos(); // se EJECUTA CUANDO SE CARGA EL COMPONENTE ES DECIR CUANDO SE ACTUALIZA LA PAGINA
  }, []);

  return <CardCoches producto={coches}></CardCoches>;
};

export default Productos; // 
