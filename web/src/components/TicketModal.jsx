import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TicketModal = ({ ticket, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {ticket.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{ticket.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TicketModal;