import { gql } from "@apollo/client";

const CREATE_CLASS = gql`
	query CreateClass($title: String!) {
		createClass(title: $title) {
			code
		}
	}
`;
const CLASS = gql`
	query Class($code: String!) {
		class(filter: { code: $code }) {
			code
			title
			students {
				id
				firstName
				lastName
			}
			attendences {
				id
				date
				students {
					firstName
					lastName
					rollno
				}
			}
		}
	}
`;

const TAKE_ATTENDENCE = gql`
	query TakeAttendence($code: String!) {
		takeAttendence(filter: { code: $code }) {
			id
			date
		}
	}
`;

export { CREATE_CLASS, CLASS, TAKE_ATTENDENCE };
