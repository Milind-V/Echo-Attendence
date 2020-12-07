import React from "react";
import { useRecoilState } from "recoil";

import { Atoms } from "../services";

const Home = ({ props }) => {
	const [user, setUser] = useRecoilState(Atoms.UserAtom);

	return (
		<div className="hero-body is-align-items-start">
			<div className="container">
				<div className="columns is-multiline">
					{user.classes.map((item) => (
						<div
							onClick={(e) =>
								props.history.push(
									`/class/${item.code}`
								)
							}
							key={item.id}
							className="column is-one-quarter">
							<div className="card">
								<header className="card-header">
									<div className="card-header-title is-size-3 is-centered">
										{item.title}
									</div>
								</header>
								<div className="card-content">
									<div className="content">
										Code: {item.code}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
