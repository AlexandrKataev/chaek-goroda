// Выбирает рандомный город на подходящую букву или возвращает сообщение о выигрыше
export const findCityByLetter = (letter: string, arr: string[]) => {
  const filteredArray = arr.filter((el) => el[0].toLowerCase() === letter.toLowerCase());
  if (filteredArray.length === 0) {
    return 'won';
  }
  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
};
