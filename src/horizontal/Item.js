import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react';
import { getTranslateX, getThresholdRange, isInsideArray } from '../helpers';

const Item = props => {
  const {
    viewBoxClientWidth,
    gear,
    children,
    itemStyle,
    onEnterEnd,
    // onEnterStart,
    // onLeaveStart,
    onLeaveEnd
    // onItemClick
  } = props;

  const [left, setLeft] = useState(viewBoxClientWidth + 1); // plus 1 to prevent onEnterStart event being triggered by the very first invoke
  const itemRef = useRef(null); // for accessing the correspong DOM node and read its layout info
  const frameRef = useRef(null); // for cleanning rAF purpose

  /* Range of the 4 key thresholds, comment out the 2 currently not in use */
  // const ENTER_START_REF = useRef();
  // const LEAVE_START_REF = useRef();
  const ENTER_END_REF = useRef();
  const LEAVE_END_REF = useRef();

  /* Initialize constants */
  const getConstants = useCallback(() => {
    let node = itemRef.current;
    let nodeOffsetWidth = node.offsetWidth;

    // ENTER_START_REF.current = getThresholdRange(Math.ceil(clientWidth), gear);
    // LEAVE_START_REF.current = getThresholdRange(0, gear);
    ENTER_END_REF.current = getThresholdRange(
      Math.ceil(viewBoxClientWidth - nodeOffsetWidth),
      gear
    );
    LEAVE_END_REF.current = getThresholdRange(
      -Math.ceil(nodeOffsetWidth),
      gear
    );
  }, [gear, viewBoxClientWidth]);

  useLayoutEffect(() => {
    getConstants();
  }, [getConstants]);

  /* Translate item by `gear`px per frame automatically */
  const memorizedAutoRun = useCallback(() => {
    function AutoRun() {
      // filter out stale useEffect's rAF, came up with 2 work arounds: WHY THOES CANNOT BE CLEAN UP PROPERLY
      frameRef.current && cancelAnimationFrame(frameRef.current);
      let node = itemRef.current;
      // for the whole list being updated, old item is destroyed
      if (!node) return false;

      let translateX = getTranslateX(node.style.transform);
      // if (isInsideArray(ENTER_START_REF.current, translateX)) {
      //   // console.log('ENTER_START', idx);
      //   onEnterStart && onEnterStart();
      // } else if (isInsideArray(LEAVE_START_REF.current, translateX)) {
      //   // console.log('LEAVE_START', idx);
      //   onLeaveStart && onLeaveStart();
      // } else
      if (isInsideArray(ENTER_END_REF.current, translateX)) {
        onEnterEnd && onEnterEnd();
      } else if (isInsideArray(LEAVE_END_REF.current, translateX)) {
        setLeft(viewBoxClientWidth + 1);
        onLeaveEnd && onLeaveEnd();
        return true;
      }

      setLeft(prev => prev - gear);
      frameRef.current = requestAnimationFrame(memorizedAutoRun);
    }
    AutoRun();
  }, [gear, onEnterEnd, onLeaveEnd, viewBoxClientWidth]);

  /* Start auto run */
  useEffect(() => {
    frameRef.current = requestAnimationFrame(memorizedAutoRun);
  }, [memorizedAutoRun]);

  return (
    <div
      className="react-marquee-line react-marquee-line-item"
      ref={itemRef}
      style={{ ...itemStyle, transform: `translate(${left}px, 0)` }}
    >
      {children}
    </div>
  );
};

export default React.memo(Item);
