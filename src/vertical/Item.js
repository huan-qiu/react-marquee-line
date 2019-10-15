import React from 'react';

const Item = props => {
  return (
    <div className="react-marquee-line react-marquee-line-item">
      {props.children}
    </div>
  );
};

export default React.memo(Item);
