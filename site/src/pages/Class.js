import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GQL } from "../services";

const quiet = require("quietjs-bundle");

const Class = ({ props }) => {
	const [student, setStudent] = useState(false);
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

	useEffect(() => {
		if (localStorage.getItem("type") === "student") {
			setStudent(true);
			quiet.addReadyCallback(() => {
				quiet.receiver({
					profile: "audible",
					onReceive: (payload) => {
						const data = quiet.ab2str(payload);
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
				{student ? null : (
					<div className="has-text-right">
						<button
							onClick={(e) =>
								takeAttendence({ variables: { code } })
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
									<tr key={item.id}>
										<th>
											Attendence {index + 1}
										</th>
										<th>
											{new Date(
												parseInt(item.date)
											).toUTCString()}
										</th>
										<th>
											{item.students.length}
										</th>
										<th>
											{(item.students.length /
												data.class.students
													.length) *
												100}
										</th>
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
