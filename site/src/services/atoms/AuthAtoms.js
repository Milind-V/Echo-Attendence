import { atom } from "recoil";

const UserAtom = atom({
	key: "user",
	default: null,
});

export { UserAtom };
