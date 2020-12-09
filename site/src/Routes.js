import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Switch, Route, Redirect } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { Login, Home, Class } from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Atoms, GQL } from "./services";

const Routes = () => {
	const [user, setUser] = useRecoilState(Atoms.UserAtom);

	const [getStudent] = useLazyQuery(GQL.ME_STUDENT, {
		onCompleted: (data) => setUser(data.meStudent),
	});
	const [getTeacher] = useLazyQuery(GQL.ME_TEACHER, {
		onCompleted: (data) => setUser(data.meTeacher),
	});
	const [logout] = useLazyQuery(GQL.LOGOUT, {
		onCompleted: (data) => {
			if (data.logout) {
				localStorage.clear();
				setUser(null);
			}
		},
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
	const onLogOut = () => logout();

	return (
		<section className="hero is-fullheight">
			<Navbar onLogOut={onLogOut} user={user} />
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
				<Route
					exact
					strict
					path="/class/:code"
					render={(props) =>
						user === null ? (
							<Redirect to="/login"></Redirect>
						) : (
							<Class props={props} />
						)
					}
				/>
			</Switch>
			<Footer />
		</section>
	);
};

export default Routes;
