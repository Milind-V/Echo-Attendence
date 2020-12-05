import React from "react";
import { atom } from "recoil";

const user = atom({
	key: "user",
	default: null,
});

export { user };
