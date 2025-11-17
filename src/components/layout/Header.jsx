import { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../imagenes/logoCrono.png';

const Header = ({ onHeightChange }) => {
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        onHeightChange(headerRef.current.offsetHeight);
      }
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateHeight();
    checkMobile();
    
    window.addEventListener('resize', updateHeight);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onHeightChange]);

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, null, `#${sectionId}`);
      }
    }
    setMenuOpen(false);
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="header" ref={headerRef}>
      <Link to="/" className="logo-link">
        <img src={logo} alt="Crono Bot Logo" className="logo-image" />
      </Link>

      {/* Botón Toggle */}
      <button 
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay transparente para la parte DERECHA (ahora que el menú sale de la izquierda) */}
      {menuOpen && isMobile && (
        <div 
          className="overlay-right" 
          onClick={handleOverlayClick}
          aria-hidden="true"
        ></div>
      )}

      {/* Menú - Ahora sale del lado izquierdo */}
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
          onClick={() => handleScrollToSection('inicio')}
        >
          Inicio
        </Link>
        
        <Link 
          to="/about" 
          className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Nosotros
        </Link>
        
        <Link 
          to="/services" 
          className={`nav-link ${isActiveLink('/services') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Servicios
        </Link>
        
        <Link 
          to="/contact" 
          className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
};

export default Header;