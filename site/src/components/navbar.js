import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div class="hero-head">
			<header class="navbar">
				<div class="container">
					<div class="navbar-brand">
						<a class="navbar-item">
							<img
								src="https://bulma.io/images/bulma-type-white.png"
								alt="Logo"
							/>
						</a>
						<span
							class="navbar-burger burger"
							data-target="navbarMenuHeroC">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</div>
					<div id="navbarMenuHeroC" class="navbar-menu">
						<div class="navbar-end"></div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
