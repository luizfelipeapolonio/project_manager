// Firestore instance
import { db } from "../firebase/config";

// Hooks and methods
import { useState, useEffect, useReducer } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const fetchReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "SUCCESS":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const useFetchProjects = (docCollection, id = null) => {
    const [project, setProject] = useState([]);
    const [states, dispatch] = useReducer(fetchReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if(cancelled) {
                return;
            }

            const collectionRef = await collection(db, docCollection);
            let searchConfig;

            dispatch({type: "LOADING"});

            try {
                searchConfig = await query(collectionRef, orderBy("createdAt", "desc"));

                await onSnapshot(searchConfig, (querySnapshot) => {
                    if(querySnapshot.docs.length === 0) {
                        setProject(null);
                    }else {
                        setProject(querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        })))
                    }
                    console.log("queySnapshot", querySnapshot);
                    dispatch({type: "SUCCESS"});
                });

            } catch(error) {
                console.log(error.message);
                dispatch({type: "ERROR", payload: error.message});
            }
        }

        loadData();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { project, states };
}