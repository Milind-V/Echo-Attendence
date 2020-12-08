import { gql } from "@apollo/client";

const CREATE_CLASS = gql`
	query CreateClass($title: String!) {
		createClass(title: $title) {
			code
		}
	}
`;

const JOIN_CLASS = gql`
	query JoinClass($code: String!) {
		joinClass(filter: { code: $code })
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
					id
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

const MARK_ATTENDENCE = gql`
	query MarkAttendence($id: ID!) {
		markAttendence(filter: { _id: $id })
	}
`;
export { CREATE_CLASS, CLASS, TAKE_ATTENDENCE, JOIN_CLASS, MARK_ATTENDENCE };
