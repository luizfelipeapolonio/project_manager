// Firestore instance
import { db } from "../firebase/config";

// Hooks and methods
import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    error: null
};

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null, message: null};
        case "SUCCESS":
            return {loading: false, error: null, message: action.payload};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const useProjectHandle = (docCollection) => {
    const [states, dispatch] = useReducer(insertReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

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
            const newDocument = {...document, createdAt: Timestamp.now()};

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            console.log("useinsertProject ", insertedDocument);

            dispatch({type: "SUCCESS", payload: null});

            navigate("/projects", {state: "Projeto criado com sucesso!"});

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
                message: "Projeto excluído com sucesso!"
            });

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                error: "Ocorreu um erro, tente mais tarde!"
            });
        }
    }

    useEffect(() => {
        return () => {
            setCancelled(true);
        }
    }, []);

    return { insertProject, deleteProject, states };
}