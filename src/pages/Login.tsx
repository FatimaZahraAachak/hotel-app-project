import { useContext, useState } from "react";
import { supabase } from "../services/supabase";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getLoginErrorMessage, isValidEmail } from "../utils/validators";




function Login() {
    const [userName, setUserName] = useState<string>('');
    const [passWord, setPassWord] = useState<string>('');
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user, loading } = authContext;
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handlePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if (!isValidEmail(userName)) {
            setErrorMessage('Adresse mail invalide');
            return;
        }

        setLoadingLogin(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: userName,
                password: passWord
            });

            if (error) {
                setErrorMessage(getLoginErrorMessage(error));
                return;
            }
        } catch {
            setErrorMessage('Erreur serveur. Réessayez plus tard.');
        } finally {
            setLoadingLogin(false);
        }
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
    const canSubmit = userName.trim().length > 0 && passWord.trim().length > 0;
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
                    disabled={loadingLogin || !canSubmit}
                    className={`w-full mt-5 rounded-xl px-4 py-3 text-sm font-medium text-white ${(loadingLogin || !canSubmit) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}

                >
                    {loadingLogin ? 'Connexion...' : 'Se connecter '}
                </button>
                {errorMessage && (
                    <p className="text-center text-red-500">
                        {errorMessage}
                    </p>
                )}
                <p className="text-xs text-gray-500 text-center">Vous n'avez pas de compte ? cliquez sur <Link to="/signUp" className="text-blue-600 border-b-2 border-blue-600 ">Créer un compte</Link></p>
            </form>
        </div>
    );

}
export default Login;