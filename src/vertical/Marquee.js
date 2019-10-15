import React from 'react';
import PropTypes from 'prop-types';
import BoxContainer from './BoxContainer';

const MarqueeVer = props => {
  const { list } = props;

  return <BoxContainer {...props} key={list.length} />;
};

MarqueeVer.defaultProps = {
  list: [],
  lines: 2
};

MarqueeVer.propTypes = {
  list: PropTypes.array,
  lines: PropTypes.number
};

export default React.memo(MarqueeVer);
