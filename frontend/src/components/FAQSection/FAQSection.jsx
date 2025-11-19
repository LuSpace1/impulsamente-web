import React, { useState } from 'react';
import './FAQSection.css';

// --- PUEDES EDITAR TU CONTENIDO AQUÍ ---
const faqData = [
  {
    question: '¿Cómo funcionan las sesiones?',
    answer: 'Las sesiones son 100% online a través de videollamada. Puedes agendar según tu disponibilidad y recibirás un link de acceso antes de cada sesión. Cada sesión dura 60 minutos y puedes programar la frecuencia que necesites: semanal, quincenal o mensual.',
  },
  {
    question: '¿Cuánto dura cada sesión?',
    answer: 'Cada sesión, ya sea de psicología o de asesoría metodológica, tiene una duración estándar de 60 minutos.',
  },
  {
    question: '¿Cuál es la diferencia entre psicología y metodología?',
    answer: 'La psicología se enfoca en tu bienestar emocional, manejo de estrés y ansiedad. La asesoría metodológica se enfoca en ayudarte a estructurar, redactar y completar tu proyecto de tesis o trabajo de grado.',
  },
  {
    question: '¿Qué incluye el Plan Integral?',
    answer: 'El Plan Integral combina lo mejor de ambos mundos: sesiones de apoyo psicológico para manejar la ansiedad del proceso y sesiones de asesoría metodológica para avanzar en tu tesis.',
  },
  {
    question: '¿Cómo agendo mi primera sesión?',
    answer: 'Simplemente ve a la sección de "Agendar", elige el profesional o el plan que prefieras, y selecciona un horario disponible en el calendario. Recibirás la confirmación por correo.',
  },
  {
    question: '¿El apoyo psicológico es solo para temas de tesis?',
    answer: 'No. Aunque nos especializamos en el estrés académico, nuestras psicólegas pueden ayudarte con cualquier desafío emocional, como ansiedad, depresión, relaciones o desarrollo personal.',
  },
];
// -----------------------------------------

const FAQSection = () => {
  // Estado para saber qué ítem está abierto. Inicia en null (cerrado).
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    // Si haces clic en el que ya está abierto, se cierra (null).
    // Si haces clic en uno nuevo, se abre (index).
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      
      {/* --- ESTE ES EL CONTENEDOR INTERNO PARA CENTRAR CONTENIDO --- */}
      <div className="faq-content-wrapper">
        
        <div className="faq-header">
          <h2>Preguntas Frecuentes</h2>
          <p>Resolvemos tus dudas sobre nuestros servicios</p>
        </div>

        <div className="accordion">
          {faqData.map((faq, index) => (
            <div
              className={`accordion-item ${openIndex === index ? 'open' : ''}`}
              key={index}
            >
              <div
                className="accordion-header"
                onClick={() => handleToggle(index)}
              >
                <span>{faq.question}</span>
                <span className="accordion-icon"></span>
              </div>
              <div className="accordion-body">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div> {/* --- CIERRE DEL faq-content-wrapper --- */}
    </section>
  );
};

export default FAQSection;