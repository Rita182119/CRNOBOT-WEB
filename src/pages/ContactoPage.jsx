import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
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
  const [submitError, setSubmitError] = useState('');
  const location = useLocation();
  const formRef = useRef();

  // Configuración de EmailJS - REEMPLAZA CON TUS DATOS REALES
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_thbe2y8', // Crea uno en https://www.emailjs.com/
    TEMPLATE_ID: 'template_fcco3ro', // Crea tu template
    USER_ID: '-ZCtHth4uHc5d6WGo' // Tu Public Key
  };

  useEffect(() => {
    if (location.hash === '#contact-form') {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        setTimeout(() => {
          formSection.scrollIntoView({ behavior: 'smooth' });
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar errores generales cuando el usuario empiece a escribir
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Nombre obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'Nombre muy corto';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    if (!formData.asunto.trim()) {
      newErrors.asunto = 'Selecciona un curso';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Mensaje obligatorio';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'Mínimo 10 caracteres';
    } else if (formData.mensaje.length > 500) {
      newErrors.mensaje = 'Máximo 500 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Enviar formulario con EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.USER_ID
      );

      console.log('Email enviado:', result.text);
      
      // Éxito
      setSubmitSuccess(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Error al enviar email:', error);
      setSubmitError('Error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función alternativa usando fetch (si prefieres no usar EmailJS)
  const handleSubmitAlternative = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Aquí puedes conectar con tu backend o servicio de forms
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          asunto: '',
          mensaje: ''
        });
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      setSubmitError('Error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    {
      icon: '💬',
      title: 'WhatsApp',
      desc: 'Chat rápido',
      url: 'https://wa.me/51977484496',
      color: '#25D366'
    },
    {
      icon: '📘',
      title: 'Facebook',
      desc: 'CRONO BOT',
      url: 'https://www.facebook.com/profile.php?id=61583167447557&locale=es_LA',
      color: '#1877F2'
    },
    {
      icon: '📱',
      title: 'Instagram',
      desc: 'CRONO BOT',
      url: 'https://www.instagram.com/cronoadmin/',
      color: '#E4405F'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      desc: 'CRONO BOT',
      url: 'https://www.linkedin.com/in/crono-bot-a16464395/',
      color: '#0A66C2'
    }
  ];

  const courseOptions = [
    'QA Fundamentals'
  ];

  return (
    <div className="contact-compact" id='contact-forms'>
      {/* Header Compacto */}
      <header className="compact-header">
        <div className="header-bg"></div>
        <div className="header-content">
          <h1 className="compact-title">
            ¿Listo para <span className="highlight">aprender en CRONO BOT</span>?
          </h1>
          <p className="compact-subtitle">
            Contáctanos y recibe información detallada de nuestros cursos
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="compact-main">
        {/* Sección Rápida de Contacto */}
        <section className="quick-contact">
          <div className="quick-grid">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="quick-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--link-color': link.color }}
              >
                <div className="quick-icon">{link.icon}</div>
                <div className="quick-info">
                  <span className="quick-title">{link.title}</span>
                  <span className="quick-desc">{link.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Formulario Compacto */}
        <section className="form-section-compact" id="contact-form">
          <div className="form-container">
            <div className="form-header-compact">
              <h2 className="form-title-compact">
                <span className="form-icon">📝</span>
                Solicita Información
              </h2>
              <p className="form-desc">Te contactamos en menos de 24h</p>
            </div>

            {submitSuccess && (
              <div className="success-message-compact">
                <div className="success-icon">✅</div>
                <div className="success-text">
                  <strong>¡Enviado con éxito!</strong>
                  <span>Te contactaremos pronto con la información del curso</span>
                </div>
              </div>
            )}

            {submitError && (
              <div className="error-message-compact">
                <div className="error-icon">❌</div>
                <div className="error-text">
                  <strong>Error</strong>
                  <span>{submitError}</span>
                </div>
              </div>
            )}

            <form 
              ref={formRef}
              className="compact-form" 
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                <div className="input-group-compact">
                  <input
                    className={`compact-input ${errors.nombre ? 'error' : ''}`}
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre completo *"
                  />
                  {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
                </div>

                <div className="input-group-compact">
                  <input
                    className={`compact-input ${errors.email ? 'error' : ''}`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="input-group-compact">
                  <input
                    className="compact-input"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="WhatsApp (opcional)"
                  />
                </div>

                <div className="input-group-compact">
                  <select
                    className={`compact-select ${errors.asunto ? 'error' : ''}`}
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                  >
                    <option value="">Curso de interés *</option>
                    {courseOptions.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.asunto && <span className="error-msg">{errors.asunto}</span>}
                </div>

                <div className="input-group-compact full-width">
                  <textarea
                    className={`compact-textarea ${errors.mensaje ? 'error' : ''}`}
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos tus objetivos... *"
                    rows="3"
                  />
                  {errors.mensaje && <span className="error-msg">{errors.mensaje}</span>}
                </div>
              </div>

              <button 
                type="submit" 
                className={`submit-btn-compact ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="btn-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Enviar Solicitud
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Info Adicional Compacta */}
        <section className="info-section">
          <div className="info-grid">
            <div className="info-card-compact">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h3>Horarios</h3>
                <div className="schedule-list">
                  <div className="schedule-item-compact">
                    <span>Lun-Vie:</span>
                    <span>9:00 - 20:00</span>
                  </div>
                  <div className="schedule-item-compact">
                    <span>Sábados:</span>
                    <span>10:00 - 14:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card-compact">
              <div className="info-icon">💻</div>
              <div className="info-content">
                <h3>Modalidad</h3>
                <p>100% Online en vivo</p>
                <p>Acceso desde cualquier dispositivo</p>
              </div>
            </div>

            <div className="info-card-compact">
              <div className="info-icon">🎯</div>
              <div className="info-content">
                <h3>Resultados</h3>
                <p>100% Práctico</p>
                <p>100% Online</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Mínimo */}
      <footer className="compact-footer">
        <div className="footer-content">
          <p className="footer-text">
            <strong>Crono Bot</strong> - Transformando carreras en tech
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactoPage;