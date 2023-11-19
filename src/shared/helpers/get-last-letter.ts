export const getLastLetter = (str: string) => {
  const lastTwoLetters = str.slice(-2).toLowerCase();

  if (lastTwoLetters[1] === 'ь' || lastTwoLetters[1] === 'ъ' || lastTwoLetters[1] === 'ы') {
    return lastTwoLetters[0];
  } else {
    return lastTwoLetters[1];
  }
};
