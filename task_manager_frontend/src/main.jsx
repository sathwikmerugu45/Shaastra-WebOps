// import React from 'react';
// import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
// import Index from "./index"
// import App from './App';

const client= new ApolloClient({
    uri:"http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export  default client;