import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user, loading } = authContext;
    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                Chargement...
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        children
    )

} 