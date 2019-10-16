import React from 'react';
import PropTypes from 'prop-types';
import ViewBox from './ViewBox';
import './index.css';

const MarqueeHor = props => {
  // `key` for updating list
  return <ViewBox {...props} key={props.list.length}></ViewBox>;
};

MarqueeHor.defaultProps = {
  list: [],
  viewBoxStyle: {},
  itemStyle: {},
  gear: 1.5
};

MarqueeHor.propTypes = {
  list: PropTypes.array,
  gear: PropTypes.oneOf([0.5, 1, 1.5, 2, 2.5]),
  viewBoxStyle: PropTypes.object,
  itemStyle: PropTypes.object
};

export default React.memo(MarqueeHor);
