import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaClock, FaUser, FaCommentDots } from 'react-icons/fa';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      // Petición al backend (GET)
      const response = await fetch('http://localhost:8000/api/contact/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Importante: 'include' envía las cookies de sesión (tu login de admin)
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error("Error del servidor:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <div className="text-center p-5"><h5>Cargando mensajes...</h5></div>;
  }

  return (
    <div className="container mt-4">
      
      {/* --- KPI: Total de Mensajes --- */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3" style={{ background: 'linear-gradient(to right, #4e54c8, #8f94fb)' }}>
            <div className="card-body">
              <h5 className="card-title"><FaEnvelope /> Total Mensajes</h5>
              <p className="card-text fs-2 fw-bold">{contacts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLA DE MENSAJES --- */}
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 text-secondary">Bandeja de Entrada</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Interesado</th>
                <th>Servicio</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr key={index}>
                    {/* Fecha */}
                    <td style={{minWidth: '120px'}}>
                      <small className="text-muted">
                        <FaClock className="me-1"/> 
                        {new Date(contact.fecha_creacion).toLocaleDateString()}
                      </small>
                    </td>
                    
                    {/* Nombre y Correo */}
                    <td>
                      <div className="fw-bold"><FaUser className="me-1 text-secondary"/> {contact.nombre}</div>
                      <div className="text-muted small">{contact.email}</div>
                    </td>

                    {/* Servicio */}
                    <td>
                      <span className="badge bg-info text-dark">
                        {contact.servicio_interes || 'General'}
                      </span>
                    </td>

                    {/* Mensaje (Resumido) */}
                    <td title={contact.mensaje}>
                      <div className="d-flex align-items-center">
                        <FaCommentDots className="text-muted me-2"/>
                        <span className="text-secondary">
                          {contact.mensaje.length > 60 
                            ? contact.mensaje.substring(0, 60) + '...' 
                            : contact.mensaje}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No hay mensajes de contacto todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsManager;