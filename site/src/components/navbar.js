import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import { GQL } from "../services";

const Navbar = ({ onLogOut, user }) => {
	const [modalVisible, showModal] = useState(false);
	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const [codeTeacher, setTeacherCode] = useState("");

	const [createClass] = useLazyQuery(GQL.CREATE_CLASS, {
		onCompleted: (data) => setTeacherCode(data.createClass.code),
	});
	const onCreateClass = () => {
		if (title === "") setError("Title should not be empty");
		else {
			setError("");
			createClass({ variables: { title } });
		}
	};
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
									Create Class
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
								{codeTeacher !== "" ? (
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
									onClick={onCreateClass}
									className="button is-success">
									Create Class
								</button>
								<button
									className="button"
									onClick={(e) => showModal(false)}>
									Cancel
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
										{user.rollno ? (
											<button className="button is-primary">
												<strong>
													Join Class
												</strong>
											</button>
										) : (
											<button
												onClick={(e) =>
													showModal(true)
												}
												className="button is-primary">
												<strong>
													Create Class
												</strong>
											</button>
										)}

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
