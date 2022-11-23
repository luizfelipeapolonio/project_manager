// Firestore Instance
import { db } from "../firebase/config";

// Auth methods
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

// Hooks
import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    // Cleanup -> deal with memory leak
    const checkIfIsCancelled = () => {
        if(cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        // Cleanup function
        checkIfIsCancelled();

        setLoading(true);

        try {
            // Create user
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            
            // Add the user name to profile
            await updateProfile(user, {displayName: data.name});

            setLoading(false);
            setMessage("Conta cadastrada com sucesso!");

            return user;

        } catch(error) {
            console.log(error.message);

            let systemErrorMessage;

            if(error.message.includes("password")) {
                systemErrorMessage = "A senha deve ter no mínimo 6 caracteres";
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado!";
            }else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde!";
            }

            setLoading(false);
            setMessage(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { createUser, message, loading };
}
