import './CtaSection.css';

const CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="section-divider"></div>
      <div className="cta-content">
        <h2>¿Listo para comenzar tu viaje en CRONO BOT?</h2>
        <p>Únete a miles de estudiantes que ya transformaron su carrera.</p>
        <div className="cta-buttons">
          <button className="cta-primary">Comienza Ahora</button>
          <button className="cta-secondary">Agendar Consultoría Gratuita</button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;