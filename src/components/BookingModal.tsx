import Modal from "react-responsive-modal"
import BookingForm from "./BookingForm"
import 'react-responsive-modal/styles.css'

type BookingModalProps = {
    price:number,
    id: number,
    open: boolean,
    onClose: () => void
}

function BookingMoadl({ open, onClose, id,price }: BookingModalProps) {


    return (
        <Modal
            open={open}
            onClose={onClose}
            center
        >
            <div className="w-[400px] h-[300px] flex flex-col gap-5 items-center ">
                <h3 className="font-bold">Réserver votre séjour</h3>
                <BookingForm id={id} price={price} />
            </div>
        </Modal>
    )
}
export default BookingMoadl