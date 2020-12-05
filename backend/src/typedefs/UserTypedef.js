import { gql } from "apollo-server";

const UserTypedef = gql`
	type SocialProvider {
		id: String
		token: String
	}

	type User {
		id: ID!
		email: EmailAddress!
		firstName: String!
		lastName: String!
		googleProvider: SocialProvider
	}

	input UserFilter {
		_id: ID
		email: String
	}

	input UserFields {
		firstName: String
		lastName: String
		email: EmailAddress
	}

	extend type Query {
		me: User!
		user(filter: UserFilter!): User!
		users(filter: UserFilter!): [User!]!
		authGoogle(accessToken: String!): String!
		deleteAccount(filter: UserFilter): Boolean!
		logout: Boolean!
	}

	extend type Mutation {
		updateUser(filter: UserFilter, input: UserFields): Boolean!
	}
`;
export default UserTypedef;
