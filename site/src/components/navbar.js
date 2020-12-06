import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="hero-head">
			<header className="navbar">
				<div className="container">
					<div className="navbar-brand">
						<a className="navbar-item">
							<img
								src="https://bulma.io/images/bulma-logo.png"
								alt="Logo"
							/>
						</a>
					</div>
					<div id="navbarMenuHeroC" className="navbar-menu">
						<div className="navbar-end"></div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
