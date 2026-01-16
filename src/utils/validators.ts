import type { AuthError } from "@supabase/supabase-js";

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isValidPassword(password: string): string | null {
    if (password.length < 8) {
        return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!/[A-Z]/.test(password)) {
        return "Le mot de passe doit contenir une majuscule";
    }
    if (!/[a-z]/.test(password)) {
        return "Le mot de passe doit contenir une minuscule";
    }
    if (!/[0-9]/.test(password)) {
        return "Le mot de passe doit contenir un chiffre";
    }
    if (!/[!@#$%^?&*]/.test(password)) {
        return "Le mot de passe doit contenir un caractère spécial";
    }
    return null;
}

export function getSignUpErrorMessage(error: AuthError): string {
    if (!error) return '';

    switch (error.code) {
        case 'user_already_exists':
            return 'Un compte existe déjà avec cet email.';
        case 'invalid_email':
            return 'Adresse e-mail invalide.';
        case 'weak_password':
            return 'Mot de passe trop faible.';
        default:
            return 'Erreur serveur. Réessayez plus tard.';
    }
}
export function getLoginErrorMessage(error: AuthError): string {
    switch (error.code) {
        case 'invalid_login_credentials':
            return 'Email ou mot de passe incorrect';
        case 'email_not_confirmed':
            return 'Veuillez confirmer votre email avant de vous connecter';
        default:
            return 'Erreur serveur. Réessayez plus tard.';
    }
}