import React, { useEffect, useState } from 'react';
import { getContactMessages, deleteContactMessage, replyContactMessage } from '../../services/api';
import { Modal, Button, Form } from 'react-bootstrap'; 

const ContactsManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el Modal de Respuesta
  const [showModal, setShowModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyData, setReplyData] = useState({ subject: '', message: '' });
  const [sending, setSending] = useState(false);

  // --- Estado para Notificación Bonita (Toast) ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000); // Se oculta a los 3 seg
  };

  // Carga inicial
  const loadMessages = async () => {
    try {
      const res = await getContactMessages();
      setMessages(res.data);
    } catch (error) {
      console.error("Error cargando mensajes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Lógica de Eliminar
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este mensaje permanentemente?")) {
      try {
        await deleteContactMessage(id);
        // Actualizamos la lista local
        setMessages(messages.filter(msg => msg.id !== id));
        showToast("🗑️ Mensaje eliminado correctamente", "danger");
      } catch (error) {
        showToast("❌ Error al eliminar", "danger");
      }
    }
  };

  // Abrir Modal
  const handleOpenReply = (msg) => {
    setSelectedMsg(msg);
    setReplyData({ 
        subject: `Re: Consulta sobre ${msg.servicio_interes || 'servicio'}`, 
        message: `Hola ${msg.nombre},\n\nGracias por escribirnos.\n\n` 
    });
    setShowModal(true);
  };

  // Enviar Respuesta (Simulación en Backend)
  const handleSendReply = async () => {
    if (!replyData.message.trim()) return showToast("⚠️ El mensaje no puede estar vacío", "warning");
    
    setSending(true);
    try {
      await replyContactMessage(selectedMsg.id, replyData);
      
      // Notificación de Éxito
      showToast(`✅ Respuesta enviada a ${selectedMsg.email}`, "success");
      
      setShowModal(false);
      loadMessages(); // Recargar para actualizar estado de leído
    } catch (error) {
      console.error(error);
      showToast("❌ Error al registrar respuesta", "danger");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-center p-5">Cargando bandeja de entrada...</div>;

  return (
    <div className="fade-in p-3 position-relative">
      
      {/* --- TOAST FLOTANTE PERSONALIZADO --- */}
      {toast.show && (
        <div 
          style={{
            position: 'fixed',
            top: '80px', // Un poco más abajo del header
            right: '20px',
            zIndex: 1060,
            minWidth: '320px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: toast.type === 'success' 
              ? 'linear-gradient(135deg, #00b09b, #96c93d)' // Verde
              : (toast.type === 'warning' 
                  ? 'linear-gradient(135deg, #f0ad4e, #ffc107)' // Amarillo
                  : 'linear-gradient(135deg, #ff5f6d, #ffc371)'), // Rojo
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>
            {toast.type === 'success' ? '🎉' : (toast.type === 'warning' ? '⚠️' : '🗑️')}
          </span>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {toast.type === 'success' ? '¡Éxito!' : (toast.type === 'warning' ? 'Atención' : 'Eliminado')}
            </div>
            <div>{toast.message}</div>
          </div>
        </div>
      )}

      {/* Estilos para animación */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

      {/* Header sin Badge de Prototipo */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0 text-muted">Bandeja de Entrada 📥</h4>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Fecha y Hora</th>
              <th>Remitente</th>
              <th>Interés</th>
              <th>Mensaje</th>
              <th className="text-center">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg.id} className={msg.leido ? 'text-muted' : 'fw-bold table-active'}>
                  {/* Fecha con Hora */}
                  <td style={{fontSize: '0.85rem', whiteSpace: 'nowrap'}}>
                    {new Date(msg.fecha_creacion).toLocaleString('es-CL', {
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </td>
                  <td>
                    <div className="fw-bold">{msg.nombre}</div>
                    <div className="small text-muted">{msg.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${msg.servicio_interes === 'Psicología' ? 'bg-info' : 'bg-warning'} text-dark`}>
                      {msg.servicio_interes || 'General'}
                    </span>
                  </td>
                  <td style={{maxWidth: '300px'}}>
                    <div className="text-truncate" title={msg.mensaje}>
                        {msg.mensaje}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="btn-group shadow-sm">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOpenReply(msg)}
                        title="Responder"
                      >
                        ↩️ Responder
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(msg.id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  No hay mensajes nuevos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Respuesta */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Responder Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Destinatario:</Form.Label>
              <Form.Control type="text" value={selectedMsg?.email} disabled className="bg-light" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Asunto:</Form.Label>
              <Form.Control 
                type="text" 
                value={replyData.subject} 
                onChange={(e) => setReplyData({...replyData, subject: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Respuesta:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                value={replyData.message}
                onChange={(e) => setReplyData({...replyData, message: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSendReply} disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar Respuesta'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsManager;