import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react';
import {
  isSameArrays,
  getTranslateX,
  getThresholdRange,
  isInsideArray
} from './helpers';
const Item = props => {
  const {
    viewBox,
    gear,
    children,
    activeArray,
    idx,
    itemStyle,
    onEnterEnd,
    // onEnterStart,
    // onLeaveStart,
    onLeaveEnd,
    onItemClick
  } = props;

  const [left, setLeft] = useState(viewBox.clientWidth + 1); // plus 1 to prevent onEnterStart event being triggered by the very first invoke
  const itemRef = useRef(null); // for accessing the correspong DOM node and read its layout info
  const frameRef = useRef(null); // for cleanning rAF purpose
  const activeArrayRef = useRef(null); // for filter out stale rAF that unable to be cleaned up

  /* Range of the 4 key thresholds, comment out the 2 currently not in use */
  // const ENTER_START_REF = useRef();
  // const LEAVE_START_REF = useRef();
  const ENTER_END_REF = useRef();
  const LEAVE_END_REF = useRef();
  /* OffsetWidth of item's DOM node */
  const ITEM_OFFSET_WIDTH_REF = useRef();

  /* Initialize constants */
  const getConstants = useCallback(() => {
    let node = itemRef.current;
    ITEM_OFFSET_WIDTH_REF.current = node.offsetWidth;
    const { clientWidth } = viewBox;

    // ENTER_START_REF.current = getThresholdRange(Math.ceil(clientWidth), gear);
    // LEAVE_START_REF.current = getThresholdRange(0, gear);
    ENTER_END_REF.current = getThresholdRange(
      Math.ceil(clientWidth - ITEM_OFFSET_WIDTH_REF.current),
      gear
    );
    LEAVE_END_REF.current = getThresholdRange(
      -Math.ceil(ITEM_OFFSET_WIDTH_REF.current),
      gear
    );
  }, [gear, viewBox]);

  useLayoutEffect(() => {
    getConstants();
  }, [getConstants]);

  /* Tranlate item by `gear`px per frame automatically */
  const memorizedAutoRun = useCallback(() => {
    function memorizedAutoRun() {
      // filter out older useEffect's rAF WHY THOES CANNOT BE CLEAN UP PROPERLY
      if (!isSameArrays(activeArrayRef.current, activeArray)) {
        return false;
      }
      let node = itemRef.current;
      let translateX = getTranslateX(node.style.transform);

      // if (isInsideArray(ENTER_START_REF.current, translateX)) {
      //   // console.log('ENTER_START', idx);
      //   onEnterStart && onEnterStart();
      // } else if (isInsideArray(LEAVE_START_REF.current, translateX)) {
      //   // console.log('LEAVE_START', idx);
      //   onLeaveStart && onLeaveStart();
      // } else
      if (isInsideArray(ENTER_END_REF.current, translateX)) {
        // console.log('ENTER_END', idx);
        onEnterEnd && onEnterEnd();
      } else if (isInsideArray(LEAVE_END_REF.current, translateX)) {
        // console.log('===LEAVE_END===', idx);
        setLeft(viewBox.clientWidth + 1);
        onLeaveEnd && onLeaveEnd();
        return true;
      }

      setLeft(prev => prev - gear);
      frameRef.current = requestAnimationFrame(memorizedAutoRun);
    }
    memorizedAutoRun();
  }, [activeArray, gear, onEnterEnd, onLeaveEnd, viewBox.clientWidth]);

  useEffect(() => {
    // Tracking the latest value of `activeArray`, for filter out stale rAF
    activeArrayRef.current = activeArray;
    frameRef.current = requestAnimationFrame(memorizedAutoRun);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [activeArray, idx, memorizedAutoRun]);

  return (
    <div
      className="react-marquee-line react-marquee-line-item"
      ref={itemRef}
      style={{ ...itemStyle, transform: `translate(${left}px, 0)` }}
      onClick={onItemClick}
    >
      {children}
    </div>
  );
};

export default Item;
