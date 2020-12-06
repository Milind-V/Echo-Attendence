import { gql } from "apollo-server";

const ClassTypedef = gql`
	type Class {
		id: ID!
		code: String!
		title: String!
		teacher: Teacher
		students: [Student]
		attendences: [Attendence]
	}

	input ClassFilter {
		_id: ID
		code: String
	}

	extend type Query {
		class(filter: ClassFilter!): Class!
		classes(filter: UserFilter!): [Class]!
		students(filter: ClassFilter!): [Student]!
		joinClass(filter: ClassFilter, student: UserFilter!): Boolean!
		createClass(filter: UserFilter!): Class!
		deleteClassTeacher(
			filter: ClassFilter!
			userFilter: UserFilter!
		): Boolean!
		deleteClassStudent(
			filter: ClassFilter!
			userFilter: UserFilter!
		): Boolean!
	}
`;

export default ClassTypedef;
