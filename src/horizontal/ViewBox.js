import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import Item from './Item';
import { getLastItem, syncLineHeightWithHeight } from '../helpers';

const ViewBox = props => {
  /* Configuration */
  const { list, viewBoxStyle, itemStyle, gear } = props;

  const [protoArray, setProtoArray] = useState(list); // the processed array based on `list` for looping
  const [activeArray, setActiveArray] = useState([0]); // keep the current activated items' idx respective to `protoArray'
  const [viewBoxClientWidth, setViewBoxClientWidth] = useState(null);

  let viewBoxRef = useRef(null);

  /* Get clientWidth of ViewBox */
  useLayoutEffect(() => {
    setViewBoxClientWidth(viewBoxRef.current.clientWidth);
  }, []);

  /*  Handler of items' onEnterEnd event */
  const memorizedOnItemEnterEnd = useCallback(() => {
    /* Activate the next item */
    function onItemEnterEnd() {
      const MAX_INDEX = protoArray.length - 1;
      const LAST_INDEX_IN_ACTIVE = getLastItem(activeArray);

      if (LAST_INDEX_IN_ACTIVE < MAX_INDEX) {
        // still got unrun item in sequence
        setActiveArray(activeArray.concat(LAST_INDEX_IN_ACTIVE + 1));
      } else if (LAST_INDEX_IN_ACTIVE === MAX_INDEX) {
        // list[0] is still running when it needs to show up at the original position
        if (activeArray.indexOf(0) > -1) {
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
  }, [activeArray, list, protoArray]);

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
      style={viewBoxStyle}
    >
      {viewBoxClientWidth &&
        protoArray.map((i, idx) => {
          // render activated items only
          if (activeArray.indexOf(idx) > -1) {
            return (
              <Item
                key={idx}
                viewBoxClientWidth={viewBoxClientWidth}
                gear={gear}
                activeArray={activeArray}
                itemStyle={itemStyle}
                onEnterEnd={memorizedOnItemEnterEnd}
                onLeaveEnd={memorizedOnItemLeaveEnd}
              >
                {i}
              </Item>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default ViewBox;
