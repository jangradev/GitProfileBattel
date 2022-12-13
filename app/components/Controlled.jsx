import * as React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    console.log(e);
    this.setState({
      email: e.target.value,
    });
  }
  handleSubmit() {
    alert('The email is ' + this.state.email);
  }
  render() {
    return (
      <div>
        <pre>The email is {this.state.email}</pre>
        <br />
        <input type='text' placeholder='Email' value={this.state.email} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
