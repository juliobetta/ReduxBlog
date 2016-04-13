import React            from 'react';
import { connect }      from 'react-redux';
import PureComponent    from './pure-component';
import AppNavBar        from './app-navbar';
import AppNotifications from './app-notifications';
import Container        from './elements/container';
import { syncAll }      from '../actions/sync-actions';


class App extends PureComponent {

  componentDidMount() {
    this.props.syncAll();
  }


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


export default connect(null, { syncAll })(App);
