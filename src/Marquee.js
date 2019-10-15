import React from 'react';
import PropTypes from 'prop-types';
import ViewBox from './horizontal/ViewBox';
import './index.css';

const Marquee = props => {
  return <ViewBox {...props} key={props.list.length}></ViewBox>;
};

export default React.memo(Marquee);

Marquee.defaultProps = {
  list: [],
  viewBoxStyle: {
    height: '100px',
    color: '#000000',
    border: '1px solid #ccc'
  },
  itemStyle: {
    fontSize: '20px'
  },
  gear: 1.5
};

Marquee.propTypes = {
  list: PropTypes.array,
  gear: PropTypes.oneOf([0.5, 1, 1.5, 2, 2.5]),
  viewBoxStyle: PropTypes.object,
  itemStyle: PropTypes.object
};
