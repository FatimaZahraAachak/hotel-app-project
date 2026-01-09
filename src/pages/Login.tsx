import { useContext, useState } from "react";
import { supabase } from "../services/supabase";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";



function Login() {
    const [userName, setUserNname] = useState('');
    const [passWord, setPassWord] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user, loading } = authContext;
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNname(e.target.value)
    }
    const handlePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({ email: userName, password: passWord });
        if (error || !data) {
            console.error(error);
            return;
        }
        navigate("/");

    }

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                Chargement...
            </div>
        );
    }
    if (user) {
        return <Navigate to="/" />;
    };


    return (
        <div className=" flex items-center  px-2 py-20">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex flex-col gap-4 w-full max-w-[600px] bg-white border rounded-2xl shadow-lg p-10"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl md:text-2xl text-blue-500 font-bold text-center">
                        Connexion
                    </h1>
                    <p className="text-xs text-gray-500 text-center">
                        Bienvenue ! Veuillez vous connecter à votre compte.
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
                    className="w-full mt-5 rounded-xl px-4 py-3 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );

}
export default Login;