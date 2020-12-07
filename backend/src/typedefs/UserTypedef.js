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
		classes: [Class]
	}

	type Student {
		id: ID!
		email: EmailAddress!
		firstName: String!
		lastName: String!
		googleProvider: SocialProvider
		rollno: String!
		class: [Class]
	}

	input UserFilter {
		_id: ID
		email: String
		rollno: String
	}

	extend type Query {
		meTeacher: Teacher!
		meStudent: Student!
		student(filter: UserFilter!): Student!
		authGoogle(accessToken: String!, rollno: String): String!
		logout: Boolean!
	}
`;
export default UserTypedef;
