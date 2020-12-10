import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { GQL } from "../services";

const Navbar = ({ onLogOut, user }) => {
	const [student, setStudent] = useState(false);

	const [modalVisible, showModal] = useState(false);
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const [codeTeacher, setTeacherCode] = useState("");

	const [createClass] = useLazyQuery(GQL.CREATE_CLASS, {
		onCompleted: (data) => setTeacherCode(data.createClass.code),
		onError: (e) => setError(e.message),
	});

	const [joinClass] = useLazyQuery(GQL.JOIN_CLASS, {
		onCompleted: (data) => showModal(false),
		onError: (e) => setError(e.message),
	});

	const onSubmit = () => {
		if (title === "")
			setError(`${student ? "Title" : "Code"} should not be empty`);
		else {
			setError("");
			if (student) {
				joinClass({ variables: { code: title } });
				showModal(false);
			} else createClass({ variables: { title } });
		}
	};

	useEffect(() => {
		if (localStorage.getItem("type") === "student") setStudent(true);
	}, []);

	return (
		<div className="hero-head">
			<header className="navbar">
				<div className="container">
					<div
						className={`modal${
							modalVisible ? " is-active" : ""
						}`}>
						<div className="modal-background"></div>
						<div className="modal-card">
							<header className="modal-card-head">
								<p className="modal-card-title">
									{`${
										student ? "Join" : "Create"
									} Class`}
								</p>
								<button
									onClick={(e) => showModal(false)}
									className="delete"
									aria-label="close"></button>
							</header>
							<section className="modal-card-body">
								{error !== "" ? (
									<div class="notification is-danger">
										{error}
									</div>
								) : null}
								{student ? (
									<input
										className="input"
										type="text"
										placeholder="Enter Code of Class"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
									/>
								) : codeTeacher !== "" ? (
									<div>Code: {codeTeacher}</div>
								) : (
									<input
										className="input"
										type="text"
										placeholder="Enter Title of Class"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
									/>
								)}
							</section>
							<footer className="modal-card-foot">
								<button
									onClick={onSubmit}
									className="button is-success">
									{`${
										student ? "Join" : "Create"
									} Class`}
								</button>
							</footer>
						</div>
					</div>
					<div className="navbar-brand">
						<a href="/" className="navbar-item">
							<img
								src="https://bulma.io/images/bulma-logo.png"
								alt="Logo"
							/>
						</a>
					</div>
					{user ? (
						<div id="navbarMenuHeroC" className="navbar-menu">
							<div className="navbar-end">
								<div className="navbar-item">
									<div className="buttons">
										<button
											onClick={(e) =>
												showModal(true)
											}
											className="button is-primary">
											<strong>
												{`${
													student
														? "Join"
														: "Create"
												} Class`}
											</strong>
										</button>
										<button
											onClick={onLogOut}
											className="button is-danger">
											Log out
										</button>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</header>
		</div>
	);
};

export default Navbar;
