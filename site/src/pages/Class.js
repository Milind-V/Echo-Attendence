import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link, useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GQL } from "../services";

const quiet = require("quietjs-bundle");

const Class = ({ props }) => {
	const { code } = useParams();
	const { loading, error, data } = useQuery(GQL.CLASS, {
		variables: { code },
	});
	const [takeAttendence] = useLazyQuery(GQL.TAKE_ATTENDENCE, {
		onCompleted: (data) => {
			const cur = new Date(parseInt(data.takeAttendence.date));
			cur.setSeconds(cur.getSeconds() + 10);
			const payload = {
				id: data.takeAttendence.id,
				timeout: cur.getTime(),
			};
			const transmit = quiet.transmitter({
				profile: "ultrasonic",
			});
			transmit.transmit(quiet.str2ab(JSON.stringify(payload)));
		},
	});

	useEffect(() => {
		// console.log(code);
	}, []);
	if (loading) return <div></div>;
	return (
		<div className="hero-body is-align-items-start">
			<div className="container">
				<div className="has-text-right">
					<button
						onClick={(e) =>
							takeAttendence({ variables: { code } })
						}
						className="button is-success">
						Take Attendence
					</button>
				</div>

				<div className="is-size-3 has-text-centered">
					{data.class.title}
				</div>

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
						{data.class.attendences.map((item, index) => (
							<tr key={item.id}>
								<th>Attendence {index + 1}</th>
								<th>
									{new Date(
										parseInt(item.date)
									).toUTCString()}
								</th>
								<th>{item.students.length}</th>
								<th>
									{(item.students.length /
										data.class.students.length) *
										100}
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Class;
