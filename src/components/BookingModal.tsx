
import Modal from "react-modal";
import BookingForm from "./BookingForm";

Modal.setAppElement("#root"); // ✅ OK aussi ici si ton projet est petit

type ModalProps = {
    isOpen: boolean,
}
function MyModal({ isOpen }: ModalProps) {
    return (
        <Modal isOpen={isOpen}>
            <BookingForm />
        </Modal>
    );
}

export default MyModal;
