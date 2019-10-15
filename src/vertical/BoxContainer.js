import React, { useState, useEffect, useRef, useCallback } from 'react';
import ItemBox from './ItemBox';

const BoxContainer = props => {
  const { list, lines } = props;
  const [subList, setSubList] = useState([]);
  const lastActiveIdx = useRef(0);

  const updateSubList = useCallback(() => {
    let listCopied = [].concat(list);
    const MAX_INDEX = listCopied.length - 1;
    let currSubList = null;

    if (lastActiveIdx.current === 0) {
      // initial truncate
      currSubList = listCopied.splice(0, lines);
      if (MAX_INDEX >= lines) {
        lastActiveIdx.current += lines;
      } else {
        lastActiveIdx.current += MAX_INDEX;
      }
    } else {
      currSubList = listCopied.splice(lastActiveIdx.current, lines);
      if (lastActiveIdx.current + lines > MAX_INDEX) {
        lastActiveIdx.current = 0;
      } else {
        lastActiveIdx.current += lines;
      }
    }
    setSubList(currSubList);
  }, [lines, list]);

  useEffect(() => {
    updateSubList();
  }, [updateSubList]);

  return (
    <ItemBox
      subList={subList}
      key={lastActiveIdx.current}
      onSlideUpEnd={updateSubList}
    />
  );
};

export default React.memo(BoxContainer);
