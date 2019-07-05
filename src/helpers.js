export function getViewBoxInfo(viewBoxNode) {
  return {
    clientWidth: viewBoxNode.clientWidth,
    // the following 2 are not used currently
    offsetWidth: viewBoxNode.offsetWidth,
    borderWidth: (viewBoxNode.offsetWidth - viewBoxNode.clientWidth) / 2
  };
}

export function getLastItem(array) {
  if (!Array.isArray(array) || array.length < 1) {
    throw new Error('invalid parameter for getLastItem');
  }
  return array[array.length - 1];
}

/* A VERY simple comparasion, use only in array that owns only primiry-type entries */
export function isSameArrays(arr1, arr2) {
  return arr1.join('') === arr2.join('');
}

/* Read the tranlateX value */
export function getTranslateX(string) {
  let regExp = /translate\((-?\d+\.?\d*)px, 0px\)/;
  let matches = regExp.exec(string);
  return Number(matches[1]);
}

/* Get the necessary itemClick to sync with the change of `protoArray` */
export function getAdditionalHanlders(originalConfig, itemCurrCounts) {
  let tmp = {};
  let keys = Object.keys(originalConfig);
  const regExp = /^idx(\d+)/;
  keys.forEach(item => {
    // since the keys share the pattern /idx(\d+)/
    let idxInKey = Number(regExp.exec(item)[1]);
    let newKey = `idx${idxInKey + itemCurrCounts}`;
    tmp[newKey] = originalConfig[item];
  });
  return tmp;
}

export function getThresholdRange(threshold, gear) {
  let i = 0.5;
  let tmp = [threshold];
  while (gear > i) {
    tmp.push(threshold + i);
    i += 0.5;
  }
  return tmp;
}

export function isInsideArray(array, item) {
  return array.indexOf(item) > -1;
}

/* Assign value of viewBox height to its line-height */
export function syncLineHeightWithHeight(viewBoxStyle) {
  const { height } = viewBoxStyle;
  if (typeof height === 'undefined') {
    return viewBoxStyle;
  } else {
    let tmp = Object.assign({}, viewBoxStyle);
    tmp.lineHeight = height;
    return tmp;
  }
}
