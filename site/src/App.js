import React from "react";
import { RecoilRoot } from "recoil";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const client = new ApolloClient({
	uri: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/",
	cache: new InMemoryCache(),
	headers: {
		authorization: `Bearer ${localStorage.getItem("token")}`,
	},
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
