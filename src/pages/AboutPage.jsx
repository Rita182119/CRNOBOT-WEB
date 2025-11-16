import { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CtaSection from '../components/sections/CtaSection';

const AboutPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const revealRefs = useRef([]);
  
  // Datos para la línea de tiempo
  const timelineData = [
    {
      year: "2025",
      month: "Agosto",
      title: "Nacimiento de CRONO BOT como una idea",
      description: "Nace la visión de revolucionar la educación tecnológica en esta nueva era de la tecnología, democratizando el acceso a conocimientos de vanguardia en desarrollo, inteligencia artificial, ciberseguridad y transformación digital."
    },
    {
      year: "2025",
      month: "Octubre",
      title: "Formalización del centro de capacitación de tecnología",
      description: "Establecemos las bases como hub de formación integral en tecnología, lanzando programas especializados en desarrollo web, testing, data science y otras áreas clave de la industria."
    },
    {
      year: "2025",
      month: "Noviembre",
      title: "Apertura oficial de CRONO BOT",
      description: "Nos lanzamos oficialmente al mercado con un webinar online masivo que marcó nuestro debut en el ecosistema tecnológico, consolidando nuestra presencia con una comunidad de entusiastas de la tecnología."
    }
  ];

  // Datos del equipo
  const teamData = [
    {
      name: "Carlos Aparcana",
      role: "CEO & Fundador",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHcEKDIduaP2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686071562007?e=1764806400&v=beta&t=VQ-38qyFUKOurshMfLta4rByfh_f78MXfHUMLYXCucE",
      bio: "Más de 8 años de experiencia en QA Automation. Especialista en frameworks de testing y mentoría técnica."
    },
    {
      name: "Ruben Quispe",
      role: "Directora Académica",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQEk8W4zJMm62g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1639937048273?e=1764806400&v=beta&t=P5_o9vgSWkdigGPenwXg2v_GvdwztwdCcYkH_-RLDwU",
      bio: "Líder en desarrollo de contenido educativo práctico para testing manual y automatizado."
    },
    {
      name: "Orlando Valencia",
      role: "Instructor Senior",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFDqFd7i3t9xA/profile-displayphoto-shrink_800_800/B4EZUfaFjOH0Ak-/0/1739988687540?e=1764806400&v=beta&t=jEk5uVfU1P5bB7W5T-vwcJMVtpjEDQAs1Ms9f3g3eIY",
      bio: "Automation Engineer con expertise en Playwright, Appium y estrategias de testing ágil."
    }
  ];

  // Valores de la empresa
  const valuesData = [
    {
      icon: "🔥",
      title: "Skills que Importan",
      description: "Olvídate de cursos aburridos. Aquí construyes portfolio con tech stack que realmente usan las empresas en 2024."
    },
    {
      icon: "⚡",
      title: "Aprendizaje Express",
      description: "De cero a developer en tiempo récord. Metodología intensiva que prioriza lo esencial para entrar al mercado YA."
    },
    {
      icon: "🤖",
      title: "Tech del Futuro",
      description: "IA, Machine Learning, Cloud Native. Preparamos para las tendencias, no para el pasado. Sé relevante hoy y mañana."
    },
    {
      icon: "💼",
      title: "Conexiones Reales",
      description: "Networking que transforma carreras. Conectamos con startups scale-ups y empresas que buscan talento como el tuyo."
    },
    {
    icon: "💡",
    title: "Innovación Constante",
    description: "Nuestros métodos evolucionan con la industria. Siempre a la vanguardia de las mejores prácticas y metodologías ágiles del sector tech."
    },
    {
      icon: "🌍",
      title: "Remote First",
      description: "Preparación 100% para trabajos remotos. Aprendes las herramientas y metodologías que usan las empresas globales para trabajo distribuido."
    }
  ];

  // Preguntas frecuentes
  // Preguntas frecuentes - Versión técnica
const faqData = [
  {
    question: "¿Qué certificación obtengo al finalizar?",
    answer: "Certificación CRONO BOT que acredita tu dominio en tecnologías de testing y automatización, con validez en el mercado laboral tech y reconocimiento por empresas del sector."
  },
  {
    question: "¿El enfoque es práctico o teórico?",
    answer: "80% práctico - 20% teórico. Aprendes haciendo: proyectos reales, casos de estudio actuales y herramientas que se usan en empresas de tecnología hoy."
  },
  {
    question: "¿Puedo empezar sin saber programar?",
    answer: "Totalmente. Nuestro programa para principiantes te lleva desde cero hasta nivel profesional, con fundamentos de programación incluidos en la ruta de aprendizaje."
  },
  {
    question: "¿Qué ventaja tiene su certificación?",
    answer: "Demuestra habilidades prácticas validadas, conocimiento en stack tecnológico actual y preparación para desafíos reales del mundo laboral tech."
  },
  {
    question: "¿Stack tecnológico que enseñas?",
    answer: "Testing manual/automático, Selenium, Appium, JMeter, metodologías ágiles, CI/CD, y herramientas que piden los reclutadores en 2024."
  },
  {
    question: "¿Soporte durante el curso?",
    answer: "Mentoría 1:1, revisión de código, resolución de dudas en tiempo real y comunidad de estudiantes para networking y colaboración."
  }
];

  // Alternar FAQ
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Efecto para animación al hacer scroll
  useEffect(() => {
    const revealElements = revealRefs.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      revealElements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section Moderna */}
      <section className="about-hero">
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="about-hero-content">
          <h1 className="animate-fadeInUp">Nuestra Historia</h1>
          <p className="hero-subtitle animate-fadeInUp delay-100">
            CRONOBOT nace con el propósito de impulsar el aprendizaje tecnológico accesible, dinamico, practico y de calidad.
Fundado por profesionales apasionados por la innovación, el centro surge como respuesta a la necesidad de formar nuevos talentos digitales capaces de afrontar los retos de la transformación tecnológica que vienen cursando la gran mayoria de empresas en la actualidad.
Desde sus inicios, CRONOBOT se ha enfocado en brindar una formación práctica, actualizada y certificada, combinando experiencia profesional con herramientas modernas de enseñanza virtual.

          </p>
          
          <div className="mission-vision-grid animate-fadeInUp delay-200">
            <div className="mission-card">
              <div className="card-icon">🚀</div>
              <h3>Misión</h3>
              <p>
                Formar y certificar profesionales competentes en las principales áreas de la tecnología, fomentando el aprendizaje continuo, la ética digital y la innovación aplicada al desarrollo personal y profesional.
              </p>
            </div>
            
            <div className="vision-card">
              <div className="card-icon">⭐</div>
              <h3>Visión</h3>
              <p>
                Convertirnos en un referente nacional en capacitación tecnológica, reconocidos por la calidad académica, el impacto social y la formación integral de nuevos talentos profesionales en un nuevo entorno digital que conlleva una constante evolución.
              </p>
            </div>
          </div>

          <div className="hero-stats animate-fadeInUp delay-300">
            <div className="hero-stat">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Práctico</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">2x</div>
              <div className="hero-stat-label">Certificación</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">2025</div>
              <div className="hero-stat-label">Fundación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section Responsive */}
      <section className="timeline-section">
        <h2>Nuestra Trayectoria</h2>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <div 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal`} 
              key={index}
              ref={el => revealRefs.current[4 + index] = el}
            >
              <div className="timeline-content">
                <span className="timeline-date">{item.month} {item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Nuestro Equipo de Expertos</h2>
        
        <div className="team-grid">
          {teamData.map((member, index) => (
            <div 
              className="team-member reveal" 
              key={index}
              ref={el => revealRefs.current[9 + index] = el}
            >
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <p>{member.bio}</p>
                <div className="social-links1">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-github"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Lo que Nos Define</h2>
        
        <div className="values-grid">
          {valuesData.map((value, index) => (
            <div 
              className="value-card reveal" 
              key={index}
              ref={el => revealRefs.current[0 + index] = el}
            >
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div 
              className={`faq-item ${activeFaq === index ? 'active' : ''} reveal`} 
              key={index}
              ref={el => revealRefs.current[16 + index] = el}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default AboutPage;