import { gql } from "@apollo/client";

const ME_STUDENT = gql`
	query MeStudent {
		meStudent {
			id
			firstName
			lastName
			email
			rollno
			classes {
				id
				title
				code
			}
		}
	}
`;

const ME_TEACHER = gql`
	query MeTeacher {
		meTeacher {
			id
			firstName
			lastName
			email
			classes {
				id
				code
				title
			}
		}
	}
`;

const GOOGLE_AUTH = gql`
	query AuthGoogle($accessToken: String!, $rollno: String) {
		authGoogle(accessToken: $accessToken, rollno: $rollno)
	}
`;

const LOGOUT = gql`
	query Logout {
		logout
	}
`;

export { ME_STUDENT, ME_TEACHER, GOOGLE_AUTH, LOGOUT };
