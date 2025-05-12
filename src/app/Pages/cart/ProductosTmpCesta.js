export default function ProductosTmpCesta() {
    // /* FUNCIÓN PARA OBTENER LA IMAGEN DEL COCHE
    // * DEVUELVE LA RUTA DE LA IMAGEN PRINCIPAL DEL COCHE SEGÚN SU MODELO_ID
    // * SI NO ENCUENTRA LA IMAGEN, DEVUELVE UNA IMAGEN POR DEFECTO
    // */
    // const getImagenCoche = (modelo_id) => {
    //     // MAPA DE IMÁGENES POR MODELO
    //     const rutasImagenes = {
    //     1: "/FOTOS/COCHES/SEATIBIZAROJO/1.jpg",
    //     2: "/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png",
    //     3: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
    //     4: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
    //     90: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
    //     91: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
    //     };

    //     // DEVOLVER IMAGEN SEGÚN MODELO_ID O IMAGEN POR DEFECTO
    //     return rutasImagenes[modelo_id] || "/FOTOS/COCHES/default.jpg";
    // };

    // /* FUNCIÓN PARA CONTINUAR COMPRANDO
    // * REDIRIGE AL USUARIO AL CATÁLOGO DE PRODUCTOS
    // */
    // const continuarComprando = () => {
    //     router.push("/Pages/Catalogo");
    // };

    // /* FUNCIÓN PARA PROCESAR EL PEDIDO
    // * ESTA FUNCIÓN SE ENCARGA DE FINALIZAR LA COMPRA
    // * EN EL FUTURO AQUÍ SE HARÁ LA LLAMADA AL BACKEND
    // *
    // * BACKEND TODO:
    // * 1. CREAR ENDPOINT PARA GUARDAR PEDIDO EN BASE DE DATOS
    // * 2. ENVIAR DATOS DEL CARRITO (cartItems) AL BACKEND
    // * 3. PROCESAR PAGO Y CONFIRMACIÓN
    // */
    // const procesarPedido = () => {
    //     // VERIFICAR SI HAY PRODUCTOS
    //     if (cartItems.length === 0) {
    //     return;
    //     }

    //     // VERIFICAR AUTENTICACIÓN
    //     if (!isLoggedIn) {
    //     router.push("/Pages/Registro");
    //     return;
    //     }

    //     // MOSTRAR MENSAJE DE PROCESAMIENTO
    //     setIsProcessing(true);

    //     // SIMULAR PROCESO DE PEDIDO
    //     // AQUÍ ES DONDE SE HARÁ LA LLAMADA AL BACKEND EN EL FUTURO
    //     setTimeout(() => {
    //     // LIMPIAR CARRITO
    //     clearCart();

    //     // FINALIZAR PROCESAMIENTO
    //     setIsProcessing(false);

    //     // REDIRIGIR A INICIO
    //     router.push("/");
    //     }, 1000);
    // };

    // /* FUNCIÓN PARA ACTUALIZAR CANTIDAD
    // * UTILIZA LA FUNCIÓN updateQuantity DEL CONTEXTO
    // * PERMITE AUMENTAR O DISMINUIR LA CANTIDAD DE UN PRODUCTO
    // *
    // * BACKEND TODO:
    // * EN EL FUTURO, ESTA FUNCIÓN DEBERÁ ACTUALIZAR LA CANTIDAD
    // * EN LA BASE DE DATOS A TRAVÉS DE UNA LLAMADA AL BACKEND
    // */
    // const handleQuantityChange = (item, newQuantity) => {
    //     // VALIDAR CANTIDAD MÍNIMA
    //     if (newQuantity < 1) newQuantity = 1;

    //     // ACTUALIZAR USANDO LA FUNCIÓN DEL CONTEXTO
    //     updateQuantity(item, newQuantity);
    // };

    // /* FUNCIÓN PARA ELIMINAR PRODUCTO
    // * UTILIZA LA FUNCIÓN removeFromCart DEL CONTEXTO
    // * ELIMINA COMPLETAMENTE UN PRODUCTO DEL CARRITO
    // *
    // * BACKEND TODO:
    // * EN EL FUTURO, ESTA FUNCIÓN DEBERÁ ELIMINAR EL PRODUCTO
    // * DE LA BASE DE DATOS A TRAVÉS DE UNA LLAMADA AL BACKEND
    // */
    // const handleRemoveItem = (item) => {
    //     removeFromCart(item);
    // };
    return(
        <>
        falta Funcion cuando No este logeado 
        </>
    )
}