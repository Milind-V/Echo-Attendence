import React from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import {
	ApolloClient,
	HttpLink,
	ApolloLink,
	InMemoryCache,
	concat,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/",
});

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: `Bearer ${localStorage.getItem("token")}` || null,
		},
	});

	return forward(operation);
});
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink),
});

const App = () => {
	return (
		<RecoilRoot>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</ApolloProvider>
		</RecoilRoot>
	);
};

export default App;
