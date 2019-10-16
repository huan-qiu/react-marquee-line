import React, { useState, useRef, useEffect, useCallback } from 'react';
import Item from './Item';
import './index.css';
import { getTranslateY } from './helpers';

const ItemBox = props => {
  const { subList, onSlideUpEnd } = props;
  const [y, setY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const itemBoxRef = useRef(null);
  const rafRef = useRef(null);

  const fadeUp = useCallback(() => {
    rafRef.current && cancelAnimationFrame(rafRef.current);
    let node = itemBoxRef.current;

    function run() {
      if (!node) return false;
      let y = getTranslateY(node.style.transform);
      if (y > -110) {
        setY(prev => prev - 5);
        setOpacity(prev => {
          let tmp = prev - 0.05;
          return tmp < 0 ? 0 : tmp;
        });
        rafRef.current = requestAnimationFrame(fadeUp);
      } else {
        onSlideUpEnd();
      }
    }
    run();
  }, [onSlideUpEnd]);

  useEffect(() => {
    let token = setTimeout(() => {
      fadeUp();
    }, 2000);

    return () => {
      token && clearTimeout(token);
    };
  }, [fadeUp]);

  return (
    <div
      ref={itemBoxRef}
      className="react-marquee-line-ver react-marquee-line-ver-itemBox"
      style={{ transform: `translateY(${y}%)`, opacity }}
    >
      {subList.map((item, idx) => {
        return <Item key={idx}>{item}</Item>;
      })}
    </div>
  );
};

export default React.memo(ItemBox);
