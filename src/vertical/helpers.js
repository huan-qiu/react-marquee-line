/* Read the tranlateX value */
export function getTranslateY(string) {
  let regExp = /translateY\((-?\d+\.?\d*)%\)/;
  let matches = regExp.exec(string);
  return Number(matches[1]);
}
