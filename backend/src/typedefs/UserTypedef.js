import { gql } from "apollo-server";

const UserTypedef = gql`
	type SocialProvider {
		id: String
		token: String
	}

	type Teacher {
		id: ID!
		email: EmailAddress!
		firstName: String!
		lastName: String!
		googleProvider: SocialProvider
		class: [Class]
	}

	type Student {
		id: ID!
		email: EmailAddress!
		firstName: String!
		lastName: String!
		googleProvider: SocialProvider
		rollno: Int!
		class: [Class]
	}

	input UserFilter {
		_id: ID
		email: String
		rollno: Int
	}

	extend type Query {
		meTeacher: Teacher!
		meStudent: Student!
		student(filter: UserFilter!): Student!
		students(filter: UserFilter!): [Student]!
		authGoogle(accessToken: String!, rollno: String): String!
		logout: Boolean!
	}
`;
export default UserTypedef;
