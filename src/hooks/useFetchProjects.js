// Firestore instance
import { db } from "../firebase/config";

// Hooks and methods
import { useState, useEffect, useReducer } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { 
    collection, 
    query, 
    onSnapshot,
    orderBy, 
    where 
} from "firebase/firestore";

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

export const useFetchProjects = (docCollection) => {
    const [projects, setProjects] = useState([]);
    const [states, dispatch] = useReducer(fetchReducer, initialState);
    const [cancelled, setCancelled] = useState(false);
    
    const { auth } = useAuthentication();
    const currentUserId = auth.currentUser.uid;

    useEffect(() => {
        const loadData = async () => {
            if(cancelled) {
                return;
            }

            const collectionRef = await collection(db, docCollection);
            let searchConfig;

            dispatch({type: "LOADING"});

            try {
                searchConfig = await query(
                    collectionRef,
                    where("userId", "==", currentUserId),
                    orderBy("createdAt", "desc")
                );

                await onSnapshot(searchConfig, (querySnapshot) => {
                    if(querySnapshot.docs.length === 0) {
                        setProjects(null);
                    }else {
                        setProjects(querySnapshot.docs.map((doc) => ({
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
    }, [docCollection, cancelled, currentUserId]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { projects, states };
}