import * as React from 'react';

export default class Hover extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         hovering: false,
      };
      this.mouseHover = this.mouseHover.bind(this);
      this.mouseOut = this.mouseOut.bind(this);
   }
   mouseHover() {
      this.setState({ hovering: true });
   }
   mouseOut() {
      this.setState({ hovering: false });
   }
   render() {
      return (
         <div onMouseOver={this.mouseHover} onMouseOut={this.mouseOut}>
            {this.props.children(this.state.hovering)}
         </div>
      );
   }
}
