import * as React from 'react';
import { render } from 'react-dom';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  render() {
    return (
      <div>
        <h2>Counter is {this.state.counter}</h2>
      </div>
    );
  }
  componentDidMount() {
    this.counterID = setInterval(() => {
      this.increment();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.counterID);
  }
  increment() {
    this.setState((state, props) => {
      return {
        counter: state.counter + 1,
      };
    });
  }
}
