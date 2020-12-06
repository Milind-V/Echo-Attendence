import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Switch, Route, Redirect } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { Login, Home } from "./pages";
import { Navbar, Footer } from "./components";
import { Atoms, GQL, Selectors } from "./services";

const Routes = () => {
	const [user, setUser] = useRecoilState(Atoms.UserAtom);

	const [getStudent] = useLazyQuery(GQL.ME_STUDENT, {
		onCompleted: (data) => setUser(data.meStudent),
	});
	const [getTeacher] = useLazyQuery(GQL.ME_TEACHER, {
		onCompleted: (data) => setUser(data.meTeacher),
	});

	useEffect(() => {
		onLogIn();
	}, []);

	const onLogIn = () => {
		if (localStorage.getItem("token")) {
			const type = localStorage.getItem("type");
			if (type === "student") getStudent();
			else getTeacher();
		}
	};

	return (
		<section className="hero is-fullheight">
			<Navbar />
			<Switch>
				<Route
					exact
					strict
					path="/"
					render={(props) =>
						user === null ? (
							<Redirect to="/login"></Redirect>
						) : (
							<Home props={props} />
						)
					}
				/>
				<Route
					exact
					path="/login"
					render={(props) =>
						user ? (
							<Redirect to="/"></Redirect>
						) : (
							<Login props={props} onLogIn={onLogIn} />
						)
					}
				/>
			</Switch>
			<Footer />
		</section>
	);
};

export default Routes;
