import { gql } from "apollo-server";

const AttendenceTypedef = gql`
	type Attendence {
		class: Class
		date: DateTime!
		students: [Student]
	}
	input AttendenceFilter {
		_id: ID!
	}
	extend type Query {
		attedences(filter: ClassFilter!): [Attendence]!
		takeAttendence(filter: UserFilter!): Attendence!
		markAttendence(
			filter: AttendenceFilter!
			userfilter: UserFilter!
		): Boolean!
	}
`;

export default AttendenceTypedef;
