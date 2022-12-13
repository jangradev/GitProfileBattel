import * as React from 'react';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Tyler',
    };

    //this.updateName = this.updateName.bind(this);
  }
  updateName() {
    this.setState({
      name: 'Mikenzi',
    });
  }

  render() {
    console.log(this);
    return (
      <React.Fragment>
        <h1>Hello, {this.state.name}</h1>
        <button onClick={this.updateName.bind(this)}>Change Name</button>
      </React.Fragment>
    );
  }
}
