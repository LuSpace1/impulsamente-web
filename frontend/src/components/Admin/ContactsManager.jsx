import React, { useEffect, useState } from "react";
import {
  getContactMessages,
  deleteContactMessage,
  replyContactMessage,
} from "../../services/api";
import { Modal, Button, Form } from "react-bootstrap";

const ContactsManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Estados para el Modal de RESPUESTA ---
  const [showModal, setShowModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyData, setReplyData] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);

  // --- NUEVOS Estados para el Modal de LECTURA ---
  const [showReadModal, setShowReadModal] = useState(false);
  const [readMsg, setReadMsg] = useState(null);

  // --- Estado para Notificación Bonita (Toast) ---
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
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
    if (
      window.confirm("¿Estás seguro de eliminar este mensaje permanentemente?")
    ) {
      try {
        await deleteContactMessage(id);
        setMessages(messages.filter((msg) => msg.id !== id));
        showToast("🗑️ Mensaje eliminado correctamente", "danger");
      } catch (error) {
        showToast("❌ Error al eliminar", "danger");
      }
    }
  };

  // Abrir Modal de RESPUESTA
  const handleOpenReply = (msg) => {
    setSelectedMsg(msg);
    setReplyData({
      subject: `Re: Consulta sobre ${msg.servicio_interes || "servicio"}`,
      message: `Hola ${msg.nombre},\n\nGracias por escribirnos.\n\n`,
    });
    setShowModal(true);
  };

  // Abrir Modal de LECTURA (NUEVO)
  const handleOpenRead = (msg) => {
    setReadMsg(msg);
    setShowReadModal(true);
  };

  // Enviar Respuesta
  const handleSendReply = async () => {
    if (!replyData.message.trim())
      return showToast("⚠️ El mensaje no puede estar vacío", "warning");

    setSending(true);
    try {
      await replyContactMessage(selectedMsg.id, replyData);
      showToast(`✅ Respuesta enviada a ${selectedMsg.email}`, "success");
      setShowModal(false);
      loadMessages();
    } catch (error) {
      console.error(error);
      showToast("❌ Error al registrar respuesta", "danger");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="text-center p-5">Cargando bandeja de entrada...</div>
    );

  return (
    <div className="fade-in p-3 position-relative">
      {/* --- TOAST FLOTANTE --- */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 1060,
            minWidth: "320px",
            padding: "16px 20px",
            borderRadius: "12px",
            background:
              toast.type === "success"
                ? "linear-gradient(135deg, #00b09b, #96c93d)"
                : toast.type === "warning"
                ? "linear-gradient(135deg, #f0ad4e, #ffc107)"
                : "linear-gradient(135deg, #ff5f6d, #ffc371)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "500",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>
            {toast.type === "success"
              ? "🎉"
              : toast.type === "warning"
              ? "⚠️"
              : "🗑️"}
          </span>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {toast.type === "success"
                ? "¡Éxito!"
                : toast.type === "warning"
                ? "Atención"
                : "Eliminado"}
            </div>
            <div>{toast.message}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0 text-muted">Bandeja de Entrada 📥</h4>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Fecha</th>
              <th>Remitente</th>
              <th>Interés</th>
              <th>Mensaje</th>
              <th className="text-center">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={msg.leido ? "text-muted" : "fw-bold table-active"}
                >
                  <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                    {new Date(msg.fecha_creacion).toLocaleDateString()} <br />
                    <small>
                      {new Date(msg.fecha_creacion).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </td>
                  <td>
                    <div className="fw-bold">{msg.nombre}</div>
                    <div className="small text-muted">{msg.email}</div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        msg.servicio_interes === "Psicología"
                          ? "bg-info"
                          : "bg-warning"
                      } text-dark`}
                    >
                      {msg.servicio_interes || "General"}
                    </span>
                  </td>
                  {/* AQUÍ LIMITAMOS EL TEXTO PARA QUE NO ROMPA LA TABLA */}
                  <td style={{ maxWidth: "250px" }}>
                    <div className="text-truncate" title={msg.mensaje}>
                      {msg.mensaje}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="btn-group shadow-sm">
                      {/* BOTÓN LEER (NUEVO) */}
                      <button
                        className="btn btn-sm btn-info text-white"
                        onClick={() => handleOpenRead(msg)}
                        title="Leer mensaje completo"
                      >
                        👁️
                      </button>

                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOpenReply(msg)}
                        title="Responder"
                      >
                        ↩️
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

      {/* --- NUEVO: MODAL PARA LEER EL MENSAJE COMPLETO --- */}
      <Modal
        show={showReadModal}
        onHide={() => setShowReadModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>📖 Mensaje Completo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {readMsg && (
            <div>
              <div className="mb-3">
                <strong className="d-block text-secondary">De:</strong>
                <span className="fs-5">{readMsg.nombre}</span>{" "}
                <span className="text-muted">({readMsg.email})</span>
              </div>
              <div className="mb-3">
                <strong className="d-block text-secondary">Interés:</strong>
                <span className="badge bg-warning text-dark">
                  {readMsg.servicio_interes}
                </span>
              </div>
              <hr />
              <div
                className="p-3 bg-light rounded border"
                style={{
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word", 
                  overflowWrap: "anywhere",
                }}
              >
                {readMsg.mensaje}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowReadModal(false);
              handleOpenReply(readMsg); // Acceso directo a responder desde aquí
            }}
          >
            ↩️ Responder
          </Button>
          <Button variant="secondary" onClick={() => setShowReadModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Respuesta (Original) */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Responder Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Destinatario:</Form.Label>
              <Form.Control
                type="text"
                value={selectedMsg?.email}
                disabled
                className="bg-light"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Asunto:</Form.Label>
              <Form.Control
                type="text"
                value={replyData.subject}
                onChange={(e) =>
                  setReplyData({ ...replyData, subject: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Respuesta:</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={replyData.message}
                onChange={(e) =>
                  setReplyData({ ...replyData, message: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSendReply}
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar Respuesta"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsManager;
