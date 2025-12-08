import Modal from "react-responsive-modal"
import BookingForm from "./BookingForm"
import 'react-responsive-modal/styles.css'

type BookingModalProps = {
    price: number,
    id: number,
    open: boolean,
    onClose: () => void
}

function BookingModal({ open, onClose, id, price }: BookingModalProps) {


    return (
        <Modal
            open={open}
            onClose={onClose}
            center
            classNames={{
                overlay: "bg-black/50 backdrop-blur-sm",
                modal: "bg-white rounded-none md:rounded-2xl shadow-xl p-6  transition-all w-screen h-screen md:w-auto md:h-auto",
                closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
            }}
        >
            <div className="flex flex-col gap-5 items-center     max-w-sm md:max-w-md lg:max-w-lg max-h-[85vh] overflow-y-auto  p-4 md:p-5 ">
                <h3 className="font-bold">Réserver votre séjour</h3>
                <BookingForm id={id} price={price} />
            </div>
        </Modal>
    )
}
export default BookingModal