import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Dashboard from './dashboard.js';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from "@apollo/client";
import client from "./utils/apollo-client";
import ErrorBoundary from "./utils/errorBoundary"
import Store from "./utils/Store";

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Store>
                <ApolloProvider client={client}>
                    <Dashboard/>
                </ApolloProvider>
            </Store>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
