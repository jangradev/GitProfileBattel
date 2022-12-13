import * as React from 'react';
import PropTypes from 'prop-types';

const styles = {
   fontSize: '24px',
   position: 'absolute',
   left: '0',
   right: '0',
   marginTop: '20px',
   textAlign: 'center',
};

class Delayed extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
      };
   }
   componentDidMount() {
      this.timeout = window.setTimeout(
         () => this.setState({ show: true }),
         this.props.wait
      );
   }
   componentWillUnmount() {
      window.clearTimeout(this.timeout);
   }

   render() {
      return this.state.show === true ? this.props.children : null;
   }
}

export default class Loading extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         content: props.text,
      };
   }
   componentDidMount() {
      const { speed, text } = this.props;
      console.log(speed, text);
      this.interval = window.setInterval(() => {
         this.state.content === text + '...'
            ? this.setState({ content: text })
            : this.setState(({ content }) => ({ content: content + '.' }));
      }, speed);
   }
   componentWillUnmount() {
      window.clearInterval(this.interval);
   }
   render() {
      return (
         <Delayed>
            <p style={styles}>{this.state.content}</p>
         </Delayed>
      );
   }
}

Delayed.defaultProps = {
   wait: 1000,
};

Loading.prototypes = {
   text: PropTypes.node.isRequired,
   speed: PropTypes.number.isRequired,
};
Loading.defaultProps = {
   text: 'loading',
   speed: 300,
};

console.log(Loading.prototype);
