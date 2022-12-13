import * as React from 'react';

export default class Form1 extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef('');
    console.log(this.input);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    console.log(this.input);
    alert('The email is ' + this.input.current.value);
  }
  handleChange(e) {
    console.log(e.target.value || 'hello');
  }
  render() {
    return (
      <div>
        <pre> Only see output after submit {this.input.current.value} </pre>
        <br />
        <input type='text' placeholder='Email' ref={this.input} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
