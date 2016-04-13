import React         from 'react';
import { connect }   from 'react-redux';
import PureComponent from './pure-component';
import Label         from './elements/label';
import { syncAll }   from '../actions/sync-actions';

class SyncIndicator extends PureComponent {

  onClickIndicator(event) {
    event.preventDefault();

    this.props.syncAll();
  }


  renderInSync() {
    return (
      <Label warning>SYNCING...</Label>
    );
  }


  renderSync() {
    return (
      <Label success>
        <a href="#" onClick={this.onClickIndicator.bind(this)}>IN SYNC</a>
      </Label>
    );
  }


  render() {
    if(this.props.isOffline) {
      return (
        <Label danger>OFFLINE</Label>
      );
    }

    return (
      this.props.isSyncInProgress ? this.renderInSync() : this.renderSync()
    );
  }

}


export default connect(
  (state) => ({
    isSyncInProgress: state.sync.started,
    isOffline: state.network.offline
  }),
  { syncAll }
)(SyncIndicator);
