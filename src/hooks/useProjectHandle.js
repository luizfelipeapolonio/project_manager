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
    updateDoc,
    getDoc, 
    Timestamp 
} from "firebase/firestore";

const initialState = {
    loading: null,
    message: null,
    payload: null,
    actionType: null
};

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, actionType: null, message: null, payload: null};
        case "SUCCESS":
            return {
                loading: false, 
                actionType: "success", 
                message: action.message,
                payload: action.payload
            };
        case "ERROR":
            return {
                loading: false, 
                actionType: "error",  
                message: action.message,
                payload: null
            };
        default:
            return state;
    }
}

export const useProjectHandle = (docCollection, projectId = null) => {
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

            dispatch({type: "SUCCESS", payload: null, message: null});

            navigate("/projects", {
                state: {message: "Projeto criado com sucesso!"}
            });

            return insertedDocument;

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                message: "Ocorreu um erro, tente mais tarde!"
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
                message: "Projeto excluído com sucesso!",
                payload: null
            });

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                message: "Ocorreu um erro ao excluir! Tente mais tarde"
            });
        }
    }

    const updateProject = async (data) => {
        checkIfIsCancelled();

        dispatch({type: "LOADING"});

        try {
            const docRef = await doc(db, docCollection, projectId);
            await updateDoc(docRef, data);

            const updatedProjectData = await getDoc(docRef);

            console.log("UPDATED PROJECT", updatedProjectData.data());

            dispatch({
                type: "SUCCESS", 
                message: "Projeto atualizado com sucesso!",
                payload: updatedProjectData.data()
            });

        } catch(error) {
            console.log(error.message);
            dispatch({type: "ERROR", message: "Ocorreu um erro, tente mais tarde!"});
        }
    }

    useEffect(() => {
        return () => {
            setCancelled(true);
        }
    }, []);

    return { insertProject, deleteProject, updateProject, states };
}