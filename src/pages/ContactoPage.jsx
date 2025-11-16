import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactoPage.css';

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);
  const location = useLocation();

  // Efecto para scroll automático al formulario cuando viene con hash
  useEffect(() => {
    if (location.hash === '#contact-form') {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        setTimeout(() => {
          formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          
          // Opcional: agregar un efecto visual de highlight
          formSection.style.transition = 'all 0.5s ease';
          formSection.style.boxShadow = '0 0 0 3px rgba(51, 255, 153, 0.5)';
          setTimeout(() => {
            formSection.style.boxShadow = 'none';
          }, 2000);
        }, 300);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es obligatorio';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío del formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Dirección',
      details: ['Av. Principal 123, Ciudad', 'Código Postal 12345, País'],
      gradient: 'gradient-1'
    },
    {
      icon: '📱',
      title: 'Teléfono',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      gradient: 'gradient-2'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@empresa.com', 'soporte@empresa.com'],
      gradient: 'gradient-3'
    }
  ];

  const businessHours = [
    { days: 'Lunes - Viernes', hours: '9:00 AM - 6:00 PM' },
    { days: 'Sábados', hours: '10:00 AM - 2:00 PM' },
    { days: 'Domingos', hours: 'Cerrado' }
  ];

  const socialMedia = [
    { 
      name: 'Facebook', 
      handle: '/EmpresaOficial', 
      icon: '📘',
      url: 'https://facebook.com/EmpresaOficial',
      gradient: 'gradient-4',
      color: '#1877F2'
    },
    { 
      name: 'Instagram', 
      handle: '@empresa_oficial', 
      icon: '📷',
      url: 'https://instagram.com/empresa_oficial',
      gradient: 'gradient-5',
      color: '#E4405F'
    },
    { 
      name: 'Twitter', 
      handle: '@empresa_oficial', 
      icon: '🐦',
      url: 'https://twitter.com/empresa_oficial',
      gradient: 'gradient-6',
      color: '#1DA1F2'
    },
    { 
      name: 'LinkedIn', 
      handle: '/company/empresa', 
      icon: '💼',
      url: 'https://linkedin.com/company/empresa',
      gradient: 'gradient-1',
      color: '#0A66C2'
    },
    { 
      name: 'TikTok', 
      handle: '@empresa_oficial', 
      icon: '🎵',
      url: 'https://tiktok.com/@empresa_oficial',
      gradient: 'gradient-2',
      color: '#000000'
    },
    { 
      name: 'YouTube', 
      handle: '/c/EmpresaOficial', 
      icon: '📺',
      url: 'https://youtube.com/c/EmpresaOficial',
      gradient: 'gradient-3',
      color: '#FF0000'
    }
  ];

  return (
    <div className="contacto-container" id="contact-section" >
      <header className="contacto-header" id="contact-form">
        <div className="header-content">
          <h1 className="contacto-title">
            <span className="title-gradient">Conecta con Nosotros</span>
          </h1>
          <p className="contacto-subtitle">
            ¿Tienes una idea genial? ¡Hablemos! Estamos aquí para convertir tus proyectos en realidad.
          </p>
          <div className="header-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
      </header>

      {submitSuccess && (
        <div className="success-message">
          <div className="success-content">
            <div className="success-icon">✨</div>
            <div className="success-text">
              <h3>¡Mensaje enviado con éxito!</h3>
              <p>Te contactaremos pronto. Mientras tanto, síguenos en redes.</p>
            </div>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="close-success"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="contacto-content">
        <div className="contacto-info">
          <div className="info-card card-hover">
            <div className="card-header">
              <h2 className="info-title">
                <span className="info-icon">💬</span>
                Información de Contacto
              </h2>
            </div>
            <div className="info-details">
              {contactInfo.map((item, index) => (
                <div key={index} className={`info-item ${item.gradient}`}>
                  <div className="info-icon-wrapper">
                    <span className="info-item-icon">{item.icon}</span>
                  </div>
                  <div className="info-text">
                    <strong>{item.title}</strong>
                    {item.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card card-hover">
            <div className="card-header">
              <h2 className="info-title">
                <span className="info-icon">⏰</span>
                Horario de Atención
              </h2>
            </div>
            <div className="info-details">
              {businessHours.map((schedule, index) => (
                <div key={index} className="schedule-item">
                  <span className="schedule-days">{schedule.days}</span>
                  <span className="schedule-hours">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card card-hover">
            <div className="card-header">
              <h2 className="info-title">
                <span className="info-icon">🌐</span>
                Síguenos en Redes
              </h2>
            </div>
            <div className="social-links">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className={`social-link ${social.gradient} ${activeSocial === index ? 'active' : ''}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveSocial(index)}
                  onMouseLeave={() => setActiveSocial(null)}
                >
                  <div className="social-icon-container">
                    <span className="social-icon">{social.icon}</span>
                  </div>
                  <div className="social-info">
                    <span className="social-name">{social.name}</span>
                    <span className="social-handle">{social.handle}</span>
                  </div>
                  <div className="social-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FORMULARIO CON ID PARA EL HASH */}
        <div className="contacto-form-container card-hover">
          <div className="form-header">
            <h2 className="form-title">Envía tu Mensaje</h2>
            <p className="form-subtitle">Cuéntanos sobre tu proyecto. ¡Respondemos en menos de 24h!</p>
          </div>
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="nombre">
                  Nombre Completo *
                </label>
                <input
                  className={`form-input ${errors.nombre ? 'error' : ''}`}
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && <span className="error-message">{errors.nombre}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email *
                </label>
                <input
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu.email@ejemplo.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="telefono">
                Teléfono
              </label>
              <input
                className="form-input"
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="asunto">
                Asunto *
              </label>
              <input
                className={`form-input ${errors.asunto ? 'error' : ''}`}
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
              />
              {errors.asunto && <span className="error-message">{errors.asunto}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mensaje">
                Mensaje *
              </label>
              <textarea
                className={`form-textarea ${errors.mensaje ? 'error' : ''}`}
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Describe tu idea o proyecto..."
                rows="5"
              />
              {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>

        <div className="contacto-map card-hover">
          <div className="map-header">
            <h3>📍 Nuestra Ubicación</h3>
            <p>Ven a visitarnos cuando quieras</p>
          </div>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-pin">
                <span className="pin-icon">📍</span>
              </div>
              <div className="map-info">
                <h4>Oficina Central</h4>
                <p>Av. Principal 123, Ciudad, País</p>
                <button className="map-btn">Ver en Google Maps</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;