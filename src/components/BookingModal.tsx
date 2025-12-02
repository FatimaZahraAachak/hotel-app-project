
import Modal from "react-modal";

Modal.setAppElement("#root"); // ✅ OK aussi ici si ton projet est petit

function MyModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            
            <button onClick={onClose}>Fermer</button>
        </Modal>
    );
}

export default MyModal;
