const ONE_DAY = 1;
const THIRTY_DAYS = 30;

const randCode = () => {
	let s = "";
	while (s.length < 6)
		s += Math.random()
			.toString(36)
			.substr(2, 6 - s.length);
	return s;
};
export { ONE_DAY, THIRTY_DAYS, randCode };
