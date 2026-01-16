import { Link } from "react-router";

export function SignUpConfirmation() {
    return (
        <div className="flex items-center justify-center px-2 py-20">
            <div className="w-full max-w-[600px] bg-white border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">

                {/* Icône succès */}
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

             
                <h1 className="text-2xl font-bold text-blue-500">
                    Inscription réussie !
                </h1>

                
                <p className="text-sm text-gray-500 max-w-md">
                    Félicitations 🎉 Votre compte a bien été créé.
                    Un email de confirmation vous a été envoyé.
                    Veuillez vérifier votre boîte mail pour activer votre compte.
                </p>

               
                <Link
                    to="/login"
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-3 rounded-xl transition text-center"
                >
                    Se connecter 
                </Link>
            </div>
        </div>
    );
}