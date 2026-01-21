import Modal from "react-responsive-modal"
import BookingForm from "./BookingForm"
import 'react-responsive-modal/styles.css'

type BookingModalProps = {
    price: number,
    id: number,
    open: boolean,
    onClose: () => void,
    userId: string
}

function BookingModal({ open, onClose, id, price, userId }: BookingModalProps) {


    return (
        <Modal
            open={open}
            onClose={onClose}
            center
            classNames={{
                overlay: "bg-black/50 backdrop-blur-sm",
                modal: "bg-white rounded-none md:rounded-2xl shadow-xl p-4 md:p-6  transition-all w-screen h-screen md:w-auto  md:min-h-[400px] md:max-h-[60vh] md:maw-w-2xl flex items-stretch",
                closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
            }}
        >
            <div className="flex flex-col gap-5 items-center  w-full   max-w-sm md:max-w-md lg:max-w-lg md:h-full overflow-y-auto  p-2 md:p-5 ">
                <h3 className=" w-full  text-center text-lg md:text-xl  font-semibold text-gray-900 sticky top-0 bg-white z-10 pb-3 border-b border-gray-100">Réserver votre séjour</h3>
                <div className="w-full pt-1 md:pt-2">
                    <BookingForm id={id} price={price} userId={userId} />
                </div>
            </div>
        </Modal>
    )
}
export default BookingModal