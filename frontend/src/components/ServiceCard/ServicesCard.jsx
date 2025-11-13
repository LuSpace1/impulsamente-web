import React from 'react';
import { Link } from 'react-router-dom';
import '../ServiceCard/ServicesCard.css'; 

const ServiceCard = ({ title, description, features, isRecommended, buttonText, link, icon, accentColor }) => {
    return (
        <div className={`col-12 col-lg-4 mb-4 ${isRecommended ? 'recommended-col' : ''}`}>
            <div className={`service-card ${isRecommended ? 'service-card-recommended' : ''}`}>
                {isRecommended && (
                    <div className="recommended-badge">
                        MÁS POPULAR
                    </div>
                )}
                {/* Lógica de Iconos Principales */}
                {isRecommended ? (
                    <div className="service-card-sparkles">
                        <i className={icon}></i> 
                    </div>
                ) : (
                    <div className="service-card-icon-wrapper">
                        <i className={`bi ${icon}`}></i>
                    </div>
                )}
                {/* Título */}
                <h3 className={`service-card-title ${isRecommended ? 'text-white' : 'text-dark-gray'}`}>{title}</h3>
                {description && (
                    <p className="service-card-description">{description}</p>
                )}
                <ul className="service-features">
                    {features.map((feature, index) => (
                        <li key={index}>
                            {isRecommended ? (
                                <i className="bi bi-check-circle-fill"></i>
                            ) : (
                                <i className="bi bi-check"></i>
                            )}
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                {/* Lógica de botones */}
                {isRecommended ? (
                    buttonText ? (
                        <Link to={link} className="service-card-button">
                            {buttonText}
                        </Link>
                    ) : (
                        <div style={{ height: '44px' }}></div>
                    )
                ) : (
                    <Link to={link} className="service-card-button">
                        {buttonText}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;