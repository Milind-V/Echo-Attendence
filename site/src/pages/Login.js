import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useLazyQuery } from "@apollo/client";

import { GQL } from "../services";

const Login = ({ props, onLogIn }) => {
	const [rollno, setRollNo] = useState("");
	const [error, setError] = useState("");
	const [getToken] = useLazyQuery(GQL.GOOGLE_AUTH, {
		onCompleted: (data) => {
			if (data) {
				localStorage.setItem("token", data.authGoogle);
				onLogIn();
			}
		},
	});

	const googleAuthHandler = (res) => {
		if (res.error === "popup_closed_by_user") {
			setError("PopUp closed by User");
		} else {
			if (rollno !== "") {
				localStorage.setItem("type", "student");
				getToken({
					variables: { accessToken: res.accessToken, rollno },
				});
			} else {
				localStorage.setItem("type", "teacher");
				getToken({
					variables: { accessToken: res.accessToken },
				});
			}
		}
	};
	return (
		<div className="hero-body">
			<div className="container">
				{error !== "" ? (
					<div className="notification is-danger">{error}</div>
				) : null}
				<div className="columns">
					<div className="column is-half">
						<div className="hero is-medium">
							<div className="hero-head">
								<div className="is-size-3 has-text-centered">
									Are you a Student?
								</div>
							</div>
							<div className="hero-body">
								<div className="container">
									<div className="columns is-multiline">
										<div className="column is-full">
											<input
												className="input"
												type="text"
												placeholder="Enter Roll No."
												value={rollno}
												onChange={(e) =>
													setRollNo(
														e.target
															.value
													)
												}
											/>
										</div>
										{rollno !== "" ? (
											<div className="column is-full">
												<div className="m-2 container has-text-centered">
													<GoogleLogin
														clientId={
															process
																.env
																.REACT_APP_GOOGLE_CLIENT_ID
														}
														buttonText="Login with Google"
														onSuccess={
															googleAuthHandler
														}
														onFailure={
															googleAuthHandler
														}
													/>
												</div>
											</div>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="column is-half">
						<div className="hero is-medium">
							<div className="hero-head">
								<div className="is-size-3 has-text-centered">
									Are you a Teacher?
								</div>
							</div>
							<div className="hero-body">
								<div className="m-2 container has-text-centered">
									<GoogleLogin
										clientId={
											process.env
												.REACT_APP_GOOGLE_CLIENT_ID
										}
										buttonText="Login with Google"
										onSuccess={googleAuthHandler}
										onFailure={googleAuthHandler}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
