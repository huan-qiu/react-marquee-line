import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react';
import {
  getTranslateX,
  getThresholdRange,
  isInsideArray
} from './helpers';

const ItemHorizontal = props => {
  const {
    viewBox,
    gear,
    children,
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

  /* Translate item by `gear`px per frame automatically */
  const memorizedAutoRun = useCallback(() => {
    function AutoRun() {
      // filter out stale useEffect's rAF, came up with 2 work arounds: WHY THOES CANNOT BE CLEAN UP PROPERLY
      cancelAnimationFrame(frameRef.current);

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
        onEnterEnd && onEnterEnd();
      } else if (isInsideArray(LEAVE_END_REF.current, translateX)) {
        setLeft(viewBox.clientWidth + 1);
        onLeaveEnd && onLeaveEnd();
        return true;
      }

      setLeft(prev => prev - gear);
      frameRef.current = requestAnimationFrame(AutoRun);
    }
    AutoRun();
  }, [gear, onEnterEnd, onLeaveEnd, viewBox.clientWidth]);

  /* Start auto run */
  useEffect(() => {
    frameRef.current = requestAnimationFrame(memorizedAutoRun);

    // no need for this, this should function like what in `AutoRun` do, but turns out it is NOT.
    // return () => {
    //   // cancelAnimationFrame(frameRef.current);
    // };
  }, [memorizedAutoRun]);

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

export default ItemHorizontal;
