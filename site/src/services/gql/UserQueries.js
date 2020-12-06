import { gql } from "@apollo/client";

const ME_STUDENT = gql`
	query MeStudent {
		meStudent {
			id
			firstName
			lastName
			email
			rollno
			class {
				id
				teacher {
					firstName
					lastName
				}
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
			class {
				id
				code
			}
		}
	}
`;

const GOOGLE_AUTH = gql`
	query AuthGoogle($accessToken: String!, $rollno: String) {
		authGoogle(accessToken: $accessToken, rollno: $rollno)
	}
`;

export { ME_STUDENT, ME_TEACHER, GOOGLE_AUTH };
