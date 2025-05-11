export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Drive Soul</h2>
          <p>Conduce tu pasión, vive tu alma.</p>
        </div>
        <div className="footer-links">
          <h3>Enlaces útiles</h3>
          <ul>
            <li>
              <a href="/about">Sobre nosotros</a>
            </li>
            <li>
              <a href="/cars">Nuestros coches</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
            <li>
              <a href="/faq">Preguntas frecuentes</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contacto</h3>
          <p>Email: contacto@drivesoul.com</p>
          <p>Teléfono: +34 123 456 789</p>
          <p>Dirección: Calle de los Sueños, 123, Madrid, España</p>
        </div>
        <div className="footer-social">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Drive Soul. Todos los derechos
          reservados.
        </p>
      </div>
      <style jsx>{`
        .footer {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 40px 20px;
          text-align: center;
        }
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-logo h2 {
          font-size: 24px;
          color: #fbbf24;
        }
        .footer-logo p {
          font-size: 14px;
          margin-top: 8px;
          color: #d1d5db;
        }
        .footer-links h3,
        .footer-contact h3,
        .footer-social h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #fbbf24;
        }
        .footer-links ul {
          list-style: none;
          padding: 0;
        }
        .footer-links li {
          margin: 5px 0;
        }
        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: #fbbf24;
        }
        .footer-contact p {
          font-size: 14px;
          margin: 5px 0;
          color: #d1d5db;
        }
        .footer-social .social-icons a {
          margin: 0 10px;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-social .social-icons a:hover {
          color: #fbbf24;
        }
        .footer-bottom {
          margin-top: 20px;
          font-size: 14px;
          color: #9ca3af;
        }
      `}</style>
    </footer>
  );
}
