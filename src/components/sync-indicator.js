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


  renderLink(label) {
    return (
      <a href="#" onClick={this.onClickIndicator.bind(this)}>{label}</a>
    );
  }


  renderInSync() {
    return (
      <Label warning>SYNCING...</Label>
    );
  }


  renderSync() {
    return (
      <Label success>{this.renderLink('IN SYNC')}</Label>
    );
  }


  render() {
    if(this.props.isOffline) {
      return (
        <Label danger>{this.renderLink('OFFLINE')}</Label>
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
