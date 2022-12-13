import * as React from 'react';
import PropTypes from 'prop-types';
import Hover from './Hover';
const container = {
   position: 'relative',
   display: 'flex',
};
export default class Tooltip extends React.Component {
   render() {
      const { children, element } = this.props;
      return (
         <Hover>
            {(receivedFromHoverState) => {
               return (
                  <div style={container}>
                     {receivedFromHoverState === true && element}
                     {children}
                  </div>
               );
            }}
         </Hover>
      );
   }
}
Tooltip.propTypes = {
   children: PropTypes.node.isRequired,
   element: PropTypes.node.isRequired,
};
