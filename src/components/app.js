import React from 'react';
import PureComponent from './pure-component';


class App extends PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


export default App;
