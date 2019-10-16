import React from 'react';

const Item = props => {
  return (
    <div className="react-marquee-line-ver react-marquee-line-ver-item">
      {props.children}
    </div>
  );
};

export default React.memo(Item);
