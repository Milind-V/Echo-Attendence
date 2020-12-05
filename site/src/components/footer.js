import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="hero-foot">
			<div className="container">
				<div className="content has-text-centere">
					All rights reserverd || Made in
					<Link href="https://bulma.io">Bulma</Link> with ❤️.
				</div>
			</div>
		</div>
	);
};

export default Footer;
