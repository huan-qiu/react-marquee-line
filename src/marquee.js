import React from 'react';
import MarqueeHor from './horizontal';
import MarqueeVer from './vertical';

const Marquee = props => {
  return props.direction === 'vertical' ? (
    <MarqueeVer {...props} />
  ) : (
    <MarqueeHor {...props} />
  );
};

export default Marquee;
