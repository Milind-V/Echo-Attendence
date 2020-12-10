import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GQL } from "../services";

const quiet = require("quietjs-bundle");

const Class = ({ props }) => {
	const [student, setStudent] = useState(false);
	const [cIndex, setIndex] = useState(-1);
	const [modalVisible, showModal] = useState(false);
	const { code } = useParams();
	const { loading, error, data } = useQuery(GQL.CLASS, {
		variables: { code },
	});

	const [takeAttendence] = useLazyQuery(GQL.TAKE_ATTENDENCE, {
		onCompleted: (data) => {
			quiet.addReadyCallback(() => {
				const cur = new Date(parseInt(data.takeAttendence.date));
				cur.setSeconds(cur.getSeconds() + 10);
				const transmit = quiet.transmitter({
					profile: "audible",
				});
				transmit.transmit(
					quiet.str2ab(
						`${data.takeAttendence.id};${cur.getTime()}`
					)
				);
			});
		},
	});
	const [markAttendence] = useLazyQuery(GQL.MARK_ATTENDENCE);
	// const tap = () => {
	// 	quiet.addReadyCallback(() => {
	// 		const transmit = quiet.transmitter({
	// 			profile: "audible",
	// 		});
	// 		transmit.transmit(
	// 			quiet.str2ab(`5fce82bd53430700963842b4;${Date.now()}`)
	// 		);
	// 	});
	// };
	useEffect(() => {
		if (localStorage.getItem("type") === "student") {
			setStudent(true);
			quiet.addReadyCallback(() => {
				quiet.receiver({
					profile: "audible",
					onReceive: (payload) => {
						const data = quiet.ab2str(payload);
						console.log(data);
						const arr = data.split(";");
						// if (Date.now() < parseInt(arr[1]))
						markAttendence({
							variables: { id: arr[0] },
						});
					},
				});
			});
		}
	}, []);

	if (loading) return <div></div>;
	return (
		<div className="hero-body is-align-items-start">
			<div className="container">
				{student ? null : cIndex === -1 ? null : (
					<div
						className={`modal${
							modalVisible ? " is-active" : ""
						}`}>
						<div className="modal-background"></div>
						<div className="modal-card">
							<header className="modal-card-head">
								<p className="modal-card-title">
									Students
								</p>
								<button
									onClick={(e) => showModal(false)}
									className="delete"
									aria-label="close"></button>
							</header>
							<section className="modal-card-body">
								<table className="table is-fullwidth">
									<thead>
										<tr>
											<th>Roll no.</th>
											<th>First Name</th>
											<th>Last Name</th>
										</tr>
									</thead>
									<tbody>
										{data.class.attendences[
											cIndex
										].students.map((item) => (
											<tr key={item.id}>
												<td>
													{item.rollno}
												</td>
												<td>
													{
														item.firstName
													}
												</td>
												<td>
													{item.lastName}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</section>
						</div>
					</div>
				)}

				{student ? null : (
					<div className="has-text-right">
						<button
							onClick={
								(e) =>
									takeAttendence({
										variables: { code },
									})
								// tap()
							}
							className="button is-success">
							Take Attendence
						</button>
					</div>
				)}

				<div className="is-size-3 has-text-centered">
					{data.class.title}
				</div>

				{student ? null : (
					<table className="table is-fullwidth">
						<thead>
							<tr>
								<th>Attendence</th>
								<th>Date</th>
								<th>Total Presentees</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							{data.class.attendences.map(
								(item, index) => (
									<tr
										key={item.id}
										onClick={(e) => {
											setIndex(index);
											showModal(true);
										}}>
										<td>
											Attendence {index + 1}
										</td>
										<td>
											{new Date(
												parseInt(item.date)
											).toUTCString()}
										</td>
										<td>
											{item.students.length}
										</td>
										<td>
											{(item.students.length /
												data.class.students
													.length) *
												100}
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Class;
