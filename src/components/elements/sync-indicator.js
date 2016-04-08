import React                from 'react';
import { connect }          from 'react-redux';
import classNames           from 'classnames';
import Label                from './label';
import PureComponent        from '../pure-component';
import { syncUp, syncDown } from '../../actions/sync-actions';


class SyncIndicator extends PureComponent {

  onClickIndicator(event) {
    event.preventDefault();

    this.props.syncUp();
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
    const classes = classNames({
      hidden: this.props.isHidden || false
    });

    return (
      this.props.isSyncInProgress ? this.renderInSync() : this.renderSync()
    );
  }

}


export default connect(
  (state) => ({
    isSyncInProgress: state.sync.started
  }),
  { syncUp, syncDown }
)(SyncIndicator);
