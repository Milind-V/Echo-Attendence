import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router";

import { Atoms, GQL } from "../services";

const Login = ({ props, onLogIn }) => {
	const [rollno, setRollNo] = useState("");
	const [error, setError] = useState("");
	let history = useHistory();
	const [getToken] = useLazyQuery(GQL.GOOGLE_AUTH, {
		onCompleted: (data) => {
			if (data) {
				localStorage.setItem("token", data.authGoogle);
				onLogIn();
				// history.push("/");
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
					<div class="notification is-danger">{error}</div>
				) : null}
				<div className="columns">
					<div className="column is-half">
						<div class="hero is-medium">
							<div class="hero-head">
								<div className="is-size-3 has-text-centered">
									Are you a Student?
								</div>
							</div>
							<div class="hero-body">
								<div className="container">
									<div className="columns is-multiline">
										<div className="column is-full">
											<input
												class="input"
												type="text"
												placeholder="Enter Roll No."
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
					<div class="column is-half">
						<div class="hero is-medium">
							<div class="hero-head">
								<div className="is-size-3 has-text-centered">
									Are you a Teacher?
								</div>
							</div>
							<div class="hero-body">
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
