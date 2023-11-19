export const formatName = (str: string) => {
  let response = str.toLowerCase().split('');
  response[0] = response[0].toUpperCase();

  return response.join('');
};
