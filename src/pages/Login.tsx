import { useState } from "react";


function Login() {
    const [userName, setUserNname] = useState('');
    const [passWord, setPassWord] = useState('');
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserNname(e.target.value)
    }
    const handlePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value)
    }
    return (
        <form className="flex flex-col justify-center items-center gap-4 bg-gray-whit border ">
            <div className="flex flex-col gap-2">
                <h1 className="">Connexion</h1>
                <p>Bienvenue!Veuillez vous connecter à votre compte.</p>
            </div>
            <input type='email' className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400  " value={userName} onChange={handleUserName} placeholder="Adesse E-mail" />
            <input type='password' className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 " value={passWord} onChange={handlePassWord} placeholder="Mot de passe" />
        </form>
    )
}
export default Login;