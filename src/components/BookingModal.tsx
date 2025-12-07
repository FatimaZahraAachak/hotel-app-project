import Modal from "react-responsive-modal"
import BookingForm from "./BookingForm"
import 'react-responsive-modal/styles.css'

type BookingModalProps = {
    price: number,
    id: number,
    open: boolean,
    onClose: () => void
}

function BookingMoadl({ open, onClose, id, price }: BookingModalProps) {


    return (
        <Modal
            open={open}
            onClose={onClose}
            center
            classNames={{
                overlay: "bg-black/50 backdrop-blur-sm",
                modal: "bg-white rounded-2xl shadow-xl p-6  transition-all",
                closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
            }}
        >
            <div className="w-[500px] h-[350px] flex flex-col gap-5 items-center ">
                <h3 className="font-bold">Réserver votre séjour</h3>
                <BookingForm id={id} price={price} />
            </div>
        </Modal>
    )
}
export default BookingMoadl