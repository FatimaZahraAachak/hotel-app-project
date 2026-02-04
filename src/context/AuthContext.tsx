import type { User } from "@supabase/supabase-js"
import { createContext } from "react"

export type AuthContextValue = {
    user: User | null,
    loading: boolean,
    logout: () => void
}
export const AuthContext = createContext<AuthContextValue | null>(null)