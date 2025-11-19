import { useNavigate } from 'react-router-dom';
import './CtaSection.css';

const CtaSection = () => {
  const navigate = useNavigate();

  // Función para redirigir a servicios
  const redirectToServices = () => {
    navigate('/contact#contact-forms');
  };

  // Función para abrir WhatsApp (similar a tu WhatsAppButton)
  const openWhatsApp = () => {
    const phoneNumber = '1234567890'; // Reemplaza con tu número real
    const defaultMessage = 'Hola, me interesa agendar una consultoría gratuita sobre sus cursos de tecnología. ¿Podrían ayudarme con esto?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="cta-section">
      <div className="section-divider"></div>
      <div className="cta-content">
        <h2>¿Listo para comenzar tu viaje en CRONO BOT?</h2>
        <p>Únete a miles de estudiantes que ya transformaron su carrera.</p>
        <div className="cta-buttons">
          <button className="cta-primary" onClick={redirectToServices}>
            Comienza Ahora
          </button>
          <button className="cta-secondary" onClick={openWhatsApp}>
            Agendar Consultoría Gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;