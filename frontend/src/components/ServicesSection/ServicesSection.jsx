import React from 'react';
import ServiceCard from '../ServiceCard/ServicesCard';
import '../ServicesSection/ServicesSection.css'

const ServicesSection = () => {
    const servicios = [
        {
            title: "Asesoría Metodológica",
            description: null,
            features: [
                "Redacción académica",
                "Estructura de tesis",
                "Normas APA/ISO",
                "Análisis de datos"
            ],
            isRecommended: false,
            buttonText: "Cotizar Plan",
            link: "/cotizar-metodologia",
            icon: "bi bi-file-earmark-text", 
            accentColor: "#E53E3E" 
        },
        {
            title: "Plan Integral",
            description: "La combinación perfecta para asegurar tu éxito con tranquilidad.",
            features: [
                "Todo lo metodológico",
                "Todo lo psicológico",
                "Preparación de defensa",
                "15% OFF incluido"
            ],
            isRecommended: true,
            buttonText: "Cotizar Plan",
            link: "/cotizar-integral",
            icon: "bi bi-stars", 
            accentColor: null 
        },
        {
            title: "Apoyo Psicológico",
            description: null,
            features: [
                "Manejo de ansiedad/estrés",
                "Bloqueos creativos",
                "Gestión del tiempo",
                "Confianza y oratoria"
            ],
            isRecommended: false,
            buttonText: "Cotizar Plan",
            link: "/cotizar-psicologico",
            icon: "bi bi-person",
            accentColor: "#3182CE" 
        }
    ];

    return (
        <section id="servicios" className="services-section">
            <div className="container">
                <div className="services-header">
                    <p className="services-pre-title fw-semibold">NUESTROS SERVICIOS</p>
                    <h2 className="services-title">Elige tu Plan Ideal</h2>
                    <p className="services-subtitle">
                        Diseñados flexiblemente para darte justo el apoyo que necesitas en cada etapa.
                    </p>
                </div>
                <div className="row justify-content-center align-items-end">
                    {servicios.map((servicio, index) => (
                        <ServiceCard
                            key={index}
                            title={servicio.title}
                            description={servicio.description}
                            features={servicio.features}
                            isRecommended={servicio.isRecommended}
                            buttonText={servicio.buttonText}
                            link={servicio.link}
                            icon={servicio.icon}
                            accentColor={servicio.accentColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;