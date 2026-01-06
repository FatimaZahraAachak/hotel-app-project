import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router";


function Login() {
    const [userName, setUserNname] = useState('');
    const [passWord, setPassWord] = useState('');
    const navigate = useNavigate();
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
        console.log(data.user);
        navigate("/");

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 min-h-[500px] max-w-[400px] bg-white border rounded-2xl shadow p-6 ">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-2xl text-blue-500 font-bold ">Connexion</h1>
                <p className="text-xs text-gray-500 text-center">Bienvenue!Veuillez vous connecter à votre compte.</p>
            </div>
            <input type='email' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 placeholder:text-gray-400  " value={userName} onChange={handleUserName} placeholder="Adesse E-mail" />
            <input type='password' className=" w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 placeholder:text-gray-400 " value={passWord} onChange={handlePassWord} placeholder="Mot de passe" />
            <button type='submit' className='w-full mt-5  rounded-xl  px-4 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 ' >Se connecter</button>
        </form>
    )
}
export default Login;