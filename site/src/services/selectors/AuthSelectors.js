import { selector } from "recoil";
import { UserAtom } from "../atoms";

const loggedIn = selector({
	key: "loggedIn",
	get: ({ get }) => {
		const user = get(UserAtom);
		if (user) return true;
		if (localStorage.getItem("token")) return true;
		return false;
	},
});

export { loggedIn };
