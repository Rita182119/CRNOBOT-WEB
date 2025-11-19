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

  // Efecto para scroll al top al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      // Si ya está en home, hacer scroll al top
      window.scrollTo(0, 0);
    } else {
      // Si está en otra página, navegar al home
      navigate('/');
    }
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="header" ref={headerRef}>
      <Link 
        to="/" 
        className="logo-link"
        onClick={handleHomeClick}
      >
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

      {/* Overlay */}
      {menuOpen && isMobile && (
        <div 
          className="overlay-right" 
          onClick={handleOverlayClick}
          aria-hidden="true"
        ></div>
      )}

      {/* Menú */}
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <Link 
          to="/" 
          className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          Inicio
        </Link>
        
        <Link 
          to="/about" 
          className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
          onClick={() => handleNavigation('/about')}
        >
          Nosotros
        </Link>
        
        <Link 
          to="/services" 
          className={`nav-link ${isActiveLink('/services') ? 'active' : ''}`}
          onClick={() => handleNavigation('/services')}
        >
          Servicios
        </Link>
        
        <Link 
          to="/contact" 
          className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
          onClick={() => handleNavigation('/contact')}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
};

export default Header;