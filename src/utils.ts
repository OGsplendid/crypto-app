export const percentDifference = (a: number, b: number) => {
  return +((b - a) * 100 / a).toFixed(2);
}

export const capitalized = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
