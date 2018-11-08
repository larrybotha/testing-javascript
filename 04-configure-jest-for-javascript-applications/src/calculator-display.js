import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import AutoScalingText from './auto-scaling-text';
import {getFormattedValue} from './utils';

const DisplayContainer = styled.div(({theme}) => ({
  background: theme.displayBackgroundColor,
  color: theme.displayTextColor,
  flex: '1',
  fontSize: '6em',
  lineHeight: '130px',
  position: 'relative',
}));

class CalculatorDisplay extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    const {value, ...props} = this.props;
    const formattedValue = getFormattedValue(
      value,
      typeof window === 'undefined' ? 'en-US' : window.navigator.language
    );

    return (
      <DisplayContainer {...props}>
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </DisplayContainer>
    );
  }
}

export default CalculatorDisplay;
