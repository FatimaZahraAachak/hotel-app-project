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
            <div className="w-[500px] h-[400px] flex flex-col gap-5 items-center ">
                <h3 className="font-bold">Réserver votre séjour</h3>
                <BookingForm />
            </div>
        </Modal>
    )
}
export default BookingMoadl