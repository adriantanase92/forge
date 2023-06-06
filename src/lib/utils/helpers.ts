export const getRandomInt = (max: number): number => {
	const equation = Math.floor(Math.random() * max);

	return equation !== 0 ? equation : 1;
};

export const getRandomIntFromInterval = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const capitalizeEveryWord = (str: string) => {
	const arr = str.split(" ");
	const newArr = arr.map(
		(str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
	);
	return newArr.join(" ");
};
