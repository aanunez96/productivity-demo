import React, {createContext, useReducer, useEffect} from 'react'
import {accountsClient} from "./accounts-js";
// localStorage.clear();
const initialState = {
    user: "undefined",
    task:(localStorage.getItem('taskInProgress') ||
        {
            "_id": "5f5bf7146d29f60099ea40f5",
            "title": "ubiquitous",
            "description": "Dolorem quia illum temporibus dolores enim assumenda nesciunt. Corporis cumque nisi. Consectetur omnis placeat atque voluptas. Ullam dolores quo pariatur rerum odit velit quasi expedita explicabo.",
            "duration": 5206,
            "progress": 0
        }
        ),
    timer: {
        status: localStorage.getItem('statusTimer')|| "stop",
        initial: localStorage.getItem('initialTimer')|| null,
    },
};

const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };

        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_TIMER':
            localStorage.setItem("statusTimer", action.payload.status);
            localStorage.setItem("initialTimer", action.payload.initial);
            return {
              ...state,
              timer: action.payload
            };
        case 'SET_TASK':
            // localStorage.setItem("taskInProgress", action.payload);
            return {
                ...state,
                task: action.payload
            };

        default:
            return state
    }
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const fetchAuthenticatedUser = async () => {
        try {
            const userInfoData = await accountsClient.getUser();
            dispatch({
                type: "GET_USER",
                payload: userInfoData
            });
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchAuthenticatedUser();
    }, [true]);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store