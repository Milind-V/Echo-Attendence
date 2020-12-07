import { gql } from "apollo-server";

const AttendenceTypedef = gql`
	type Attendence {
		class: Class
		date: Int!
		students: [Student]
	}
	input AttendenceFilter {
		_id: ID!
	}
	extend type Query {
		attendences(filter: ClassFilter!): [Attendence]!
		takeAttendence(filter: ClassFilter!): Attendence!
		markAttendence(filter: AttendenceFilter!): Boolean!
	}
`;

export default AttendenceTypedef;
