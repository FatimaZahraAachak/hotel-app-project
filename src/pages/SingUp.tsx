import { useState } from "react";
import { supabase } from "../services/supabase";
import { Link } from "react-router";

export function SingUp() {
    const [userName, setUserNname] = useState<string>('');
    const [passWord, setPassWord] = useState<string>('');
    const [loadingSingUp, setLoadingSingUp] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const isActive = userName.trim().length > 0 && passWord.trim().length > 0;
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNname(e.target.value)
    }
    const handlePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSingUp(true);
        setErrorMessage('');
        const { error } = await supabase.auth.signUp({ email: userName, password: passWord });
        if (error) {
            setLoadingSingUp(false);
            setErrorMessage('Email ou mot de passe incorrect');
            return;
        }
        setLoadingSingUp(false);

    }
    return (
        <div className=" flex items-center  px-2 py-20">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex flex-col gap-4 w-full max-w-[600px] bg-white border rounded-2xl shadow-lg p-10"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl md:text-2xl text-blue-500 font-bold text-center">
                        Créer un compte
                    </h1>
                    <p className="text-xs text-gray-500 text-center">
                        Rejoingner HotelApp en quelques secondes
                    </p>
                </div>

                <input
                    type="email"
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-300"
                    value={userName}
                    onChange={handleUserName}
                    placeholder="Adresse e-mail"
                />

                <input
                    type="password"
                    className="w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-200"
                    value={passWord}
                    onChange={handlePassWord}
                    placeholder="Mot de passe"
                />

                <button
                    type="submit"
                    disabled={loadingSingUp || !isActive}
                    className={`w-full mt-5 rounded-xl px-4 py-3 text-sm font-medium text-white ${(loadingSingUp || !isActive) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}

                >
                    {loadingSingUp ? 'Création...' : 'Créer mon compte '}
                </button>
                {errorMessage && (
                    <p className="text-center text-red-500">
                        {errorMessage}
                    </p>
                )}
                <p className="text-xs text-gray-500 text-center">Vous avez déja un compte ? cliquez sur <Link to="/login" className="text-blue-600 border-b-2 border-blue-600 ">Se connecter</Link></p>
            </form>
        </div>
    );

}