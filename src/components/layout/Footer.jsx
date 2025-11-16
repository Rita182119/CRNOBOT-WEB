import "./Footer.css";
import logo from '../../imagenes/logoCrono.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">
          <img src={logo} alt="Crono Bot Logo" className="logo-image" />
        </h2>
        <nav className="footer-links">
          <a href="#">Inicio</a>
          <a href="#">Sobre nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </nav>
        <div className="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61583167447557" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/in/crono-bot-a16464395/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://tiktok.com/@cronobot" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
