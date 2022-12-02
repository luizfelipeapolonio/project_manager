// Firestore instance
import { db } from "../firebase/config";

// Hooks and methods
import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { 
    collection, 
    addDoc, 
    deleteDoc, 
    doc, 
    Timestamp 
} from "firebase/firestore";

const initialState = {
    loading: null,
    message: null,
    actionType: null
};

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, actionType: null, message: null};
        case "SUCCESS":
            return {loading: false, actionType: "success", message: action.payload};
        case "ERROR":
            return {loading: false, actionType: "error",  message: action.payload};
        default:
            return state;
    }
}

export const useProjectHandle = (docCollection) => {
    const [states, dispatch] = useReducer(insertReducer, initialState);
    const [cancelled, setCancelled] = useState(false);
    const { auth } = useAuthentication();

    const navigate = useNavigate();

    const checkIfIsCancelled = () => {
        if(cancelled) {
            return;
        }
    }

    const insertProject = async (document) => {
        checkIfIsCancelled();
        
        dispatch({type: "LOADING"});

        try {
            const currentUser = auth.currentUser;

            const newDocument = {
                ...document, 
                createdAt: Timestamp.now(),
                userId: currentUser.uid
            };

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            console.log("useinsertProject ", insertedDocument);

            dispatch({type: "SUCCESS", payload: null});

            navigate("/projects", {
                state: {message: "Projeto criado com sucesso!"}
            });

            return insertedDocument;

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                payload: "Ocorreu um erro, tente mais tarde!"
            });
        }
    }

    const deleteProject = async (id) => {
        checkIfIsCancelled();

        dispatch({type: "LOADING"});

        try {
            await deleteDoc(doc(db, docCollection, id));

            dispatch({
                type: "SUCCESS", 
                payload: "Projeto excluído com sucesso!"
            });

        } catch(error) {
            console.log(error.message);
            dispatch({type: "ERROR", payload: null});
        }
    }

    useEffect(() => {
        return () => {
            setCancelled(true);
        }
    }, []);

    return { insertProject, deleteProject, states };
}