import React            from 'react';
import PureComponent    from './pure-component';
import AppNavBar        from './app-navbar';
import AppNotifications from './app-notifications';
import Container        from './elements/container';


class App extends PureComponent {

  render() {
    return (
      <div>
        <AppNavBar />

        <Container>
          <main>
            <AppNotifications />
            {this.props.children}
          </main>
        </Container>
      </div>
    );
  }
}

export default App;
