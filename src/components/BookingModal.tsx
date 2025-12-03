import Modal from "react-responsive-modal"
import BookingForm from "./BookingForm"
import 'react-responsive-modal/styles.css'

type BookingModalProps = {
    open: boolean,
    onClose: () => void
}

function BookingMoadl({ open, onClose }: BookingModalProps) {


    return (
        <Modal
            open={open}
            onClose={onClose}
            center
        >
            <div >
                <div >
                    <h3 >Réserver votre séjour</h3>
                </div>
                <BookingForm />
            </div>
        </Modal>
    )
}
export default BookingMoadl