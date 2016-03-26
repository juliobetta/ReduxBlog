import React from 'react';
import PureComponent from './pure-component';
import AppNavBar from './app-navbar';
import Container from './elements/container';


class App extends PureComponent {
  render() {
    return (
      <div>
        <AppNavBar />

        <Container>
          <main>
            {this.props.children}
          </main>
        </Container>
      </div>
    );
  }
}


export default App;
