import React from "react";
import { RecoilRoot } from "recoil";
import { Navbar, Footer } from "./components";

function App() {
	return (
		<RecoilRoot>
			<Navbar />
			<Footer />
		</RecoilRoot>
	);
}

export default App;
