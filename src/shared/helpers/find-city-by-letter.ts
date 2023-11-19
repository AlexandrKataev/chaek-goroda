export const findCityByLetter = (letter: string, arr: string[]) => {
  return arr.find((el) => el[0].toLowerCase() === letter.toLowerCase()) || 'won';
};
