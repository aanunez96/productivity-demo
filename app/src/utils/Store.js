import React, {createContext, useReducer, useEffect} from 'react'
import {accountsClient} from "./accounts-js";

const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return null;

        case 'GET_USER':
            return action.payload;

        default:
            return state
    }
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, "undefined");

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
    }, []);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(null);
export default Store