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
		classes: [Class]!
		students(filter: ClassFilter!): [Student]!
		joinClass(filter: ClassFilter): Boolean!
		createClass(title: String!): Class!
	}
`;

export default ClassTypedef;
