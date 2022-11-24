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
import { useState, useEffect, useReducer } from "react";

// Initial state of useReducer hook
const initialState = {
    loading: null,
    message: null,
    actionType: null
}

const statesReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true};
        case "SUCCESS":
            return {
                loading: false, 
                message: action.payload, 
                actionType: "success"
            };
        case "ERROR":
            return {
                loading: false, 
                message: action.payload,
                actionType: "error"
            };
        default:
            return state;
    }
}

export const useAuthentication = () => {
    // const [message, setMessage] = useState(null);
    // const [loading, setLoading] = useState(null);
    const [states, dispatch] = useReducer(statesReducer, initialState);
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

        dispatch({type: "LOADING"});

        try {
            // Create user
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            
            // Add the user name to profile
            await updateProfile(user, {displayName: data.name});
            
            dispatch({type: "SUCCESS", payload: "Conta cadastrada com sucesso!"});
            // setLoading(false);
            // setMessage("Conta cadastrada com sucesso!");

            return user;

        } catch(error) {
            console.log(error.message);

            let systemErrorMessage;

            if(error.message.includes("password")) {
                systemErrorMessage = "A senha deve ter no mínimo 6 caracteres";
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado!";
            } else if(error.message.includes("invalid-email")) {
                systemErrorMessage = "E-mail inválido!";
            }else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde!";
            }

            dispatch({type: "ERROR", payload: systemErrorMessage});
            // setLoading(false);
            // setMessage(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { createUser, states };
}
