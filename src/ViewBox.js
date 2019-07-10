import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ItemHorizontal from './ItemHorizontal';
import './index.css';
import {
  getViewBoxInfo,
  getLastItem,
  getAdditionalHanlders,
  syncLineHeightWithHeight
} from './helpers';

const ViewBox = props => {
  /* Configuration */
  const { list, viewBoxStyle, itemStyle, gear, itemClicks } = props;

  const [protoArray, setProtoArray] = useState(list); // the processed array based on `list` for looping
  const [activeArray, setActiveArray] = useState([0]); // keep the current activated items' idx respective to `protoArray'
  const [viewBox, setViewBox] = useState(null);

  let viewBoxRef = useRef(null);
  let itemClickRef = useRef(Object.assign({}, itemClicks));

  const CLICKS_COUNT = Object.keys(itemClicks).length;

  /* Get layout info of ViewBox */
  useLayoutEffect(() => {
    const VIEW_BOX = getViewBoxInfo(viewBoxRef.current);
    setViewBox(VIEW_BOX);
  }, []);

  /*  Handler of items' onEnterEnd event */
  const memorizedOnItemEnterEnd = useCallback(() => {
    /* Activate the next item */
    function onItemEnterEnd() {
      const MAX_INDEX = protoArray.length - 1;
      const LAST_INDEX_IN_ACTIVE = getLastItem(activeArray);

      if (LAST_INDEX_IN_ACTIVE < MAX_INDEX) {
        setActiveArray(activeArray.concat(LAST_INDEX_IN_ACTIVE + 1));
      } else if (LAST_INDEX_IN_ACTIVE === MAX_INDEX) {
        // list[0] is still running when it needs to show up at the original position
        if (activeArray.indexOf(0) > -1) {
          // If the corresponding `itemClicks` should be updated to coincide with appending one more copy of orignal list to `protoArray`,
          if (CLICKS_COUNT) {
            let moreConfig = getAdditionalHanlders(
              itemClicks,
              protoArray.length
            );
            let snapshotItemClickRef = Object.assign({}, itemClickRef.current);
            itemClickRef.current = Object.assign(
              snapshotItemClickRef,
              moreConfig
            );
          }
          // append one more copy of list to `protoArray`
          setProtoArray(prev => prev.concat(list));
          setActiveArray(activeArray.concat(MAX_INDEX + 1));
        }
        // list[0] has already dead and good to go back to its original position
        else {
          setActiveArray(activeArray.concat(0));
        }
      }
    }
    onItemEnterEnd();
  }, [CLICKS_COUNT, activeArray, itemClicks, list, protoArray]);

  /*  Handler of items' onLeaveEnd event */
  const memorizedOnItemLeaveEnd = useCallback(() => {
    // deactivate item that invisible to the viewbox
    function onItemLeaveEnd() {
      setActiveArray(prev => {
        prev.shift();
        return prev;
      });
    }
    onItemLeaveEnd();
  }, []);

  return (
   <div
      className="react-marquee-line react-marquee-line-viewBox"
      ref={viewBoxRef}
      style={syncLineHeightWithHeight(viewBoxStyle)}
    > 
      {viewBox &&
        protoArray.map((i, idx) => {
          // render activated items only
          if (activeArray.indexOf(idx) > -1) {
            // get item's individual click handler if has any
            let clickConfig = itemClickRef.current[`idx${idx}`];
            return (
              <ItemHorizontal
                key={idx}
                idx={idx}
                viewBox={viewBox}
                gear={gear}
                activeArray={activeArray}
                itemStyle={itemStyle}
                onEnterEnd={memorizedOnItemEnterEnd}
                onLeaveEnd={memorizedOnItemLeaveEnd}
                onItemClick={clickConfig && clickConfig.click}
              >
                {i}
              </ItemHorizontal>
            );
          } else {
            return null;
          }
        })}
   </div> 
  );
};


export default ViewBox;
