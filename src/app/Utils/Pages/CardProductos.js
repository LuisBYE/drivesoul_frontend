export default function CardProductos({ productos }) {
  return (
    <div className="contenedor-cards">
      {productos.map((item) => (
        <div key={item.id} className="card">
          <div className="card-header">
            <h3>{item.nombre}</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Nombre:</strong> {item.nombre}
            </p>
            <p>
              <strong>Descripción:</strong> {item.descripcion}
            </p>
            <p>
              <strong>Precio:</strong> ${item.precio.toFixed(2)}
            </p>
            <p>
              <strong>Categoría:</strong> {item.categoria}
            </p>
          </div>
        </div>
      ))}
      <style jsx>{`
        .contenedor-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          background-color: #f9fafb;
        }
        .card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          width: 280px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .card-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
          text-align: center;
        }
        .card-body p {
          font-size: 16px;
          margin: 8px 0;
          color: #4b5563;
        }
        .card-body p strong {
          color: #111827;
        }
      `}</style>
    </div>
  );
}
