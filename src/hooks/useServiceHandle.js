// Firestore instance
import { db } from "../firebase/config";

// Hooks and methods
import { useState, useEffect, useReducer } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const initialState = {
    loading: null,
    message: null,
    payload: null,
    actionType: null
}

const serviceReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, message: null, actionType: null, payload: null};
        case "SUCCESS":
            return {
                loading: false, 
                message: action.message,
                payload: action.payload, 
                actionType: "success"
            };
        case "ERROR":
            return {
                loading: false,
                message: action.message,
                payload: null,
                actionType: "error"
            };
        default:
            return state;
    }
}

export const useServiceHandle = (docCollection, id) => {
    const [states, dispatch] = useReducer(serviceReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkIfIsCancelled = () => {
        if(cancelled) {
            return;
        }
    }

    // Insert service to a project
    const insertService = async (data) => {
        checkIfIsCancelled();

        dispatch({type: "LOADING"});

        try {
            const docRef = doc(db, docCollection, id);
            await updateDoc(docRef, {services: arrayUnion(data)});

            const updatedProjectData = await getDoc(docRef);

            dispatch({
                type: "SUCCESS", 
                message: "Serviço adicionado com sucesso!",
                payload: updatedProjectData.data()
            });

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                message: "Ocorreu um erro ao criar serviço! Tente mais tarde"
            });
        }
    }

    const deleteService = async (serviceObject) => {
        checkIfIsCancelled();

        dispatch({type: "LOADING"});

        try {
            const docRef = doc(db, docCollection, id);
            await updateDoc(docRef, {services: arrayRemove(serviceObject)});

            const updatedProjectData = await getDoc(docRef);

            dispatch({
                type: "SUCCESS",
                message: "Serviço excluído com sucesso!",
                payload: updatedProjectData.data()
            })

        } catch(error) {
            console.log(error.message);
            dispatch({
                type: "ERROR", 
                message: "Ocorreu um erro ao excluir! Tente mais tarde!"
            });
        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertService, deleteService, states };
}