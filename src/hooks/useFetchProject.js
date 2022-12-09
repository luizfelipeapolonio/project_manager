// Firestore instance
import { db } from "../firebase/config";

// Hooks
import { useState, useEffect, useReducer } from "react";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    message: null,
    actionType: null
}

const fetchReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, message: null};
        case "SUCCESS":
            return {
                loading: false, 
                message: action.message, 
                actionType: "success"
            };
        case "ERROR":
            return {
                loading: false,
                message: action.message,
                actionType: "error"
            };
        default:
            return state;
    }
}

export const useFetchProject = (docCollection, id) => {
    const [states, dispatch] = useReducer(fetchReducer, initialState);
    const [project, setProject] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadProject = async () => {
            if(cancelled) {
                return;
            }
    
            dispatch({type: "LOADING"});
            try {
                const docRef = await doc(db, docCollection, id);
                const projectData = await getDoc(docRef);

                setProject(projectData.data());

                dispatch({type: "SUCCESS", message: null});

            } catch(error) {
                console.log(error.message);
                dispatch({
                    type: "ERROR", 
                    message: "Ocorreu um erro, tente mais tarde!"
                });
            }
        }
    
        loadProject();
    }, [id, docCollection, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { project, states };
}