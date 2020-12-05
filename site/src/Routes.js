import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login, Home } from "./pages";
import { Navbar, Footer } from "./components";

const Routes = () => {
	return (
		<section className="hero is-fullheight">
			<Navbar />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/login" component={Login}></Route>
			</Switch>
			<Footer />
		</section>
	);
};

export default Routes;
