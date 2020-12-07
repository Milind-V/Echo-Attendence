import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogOut, user }) => {
	return (
		<div className="hero-head">
			<header className="navbar">
				<div className="container">
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
											<button className="button is-primary">
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
