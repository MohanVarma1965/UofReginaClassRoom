import React from 'react';
import {Page, Row, Column} from 'hedron';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SidePannel from './SidePannel';

import Notifications from './Notifications';
import {registerWithEmailPassword, signInwithEmailPassword, signOut} from '../actions/auth';

import PageHeader from '../containers/PageHeader';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    return (
      <div className="layout-container">
        <PageHeader/>
        <div className="pannels-container">
          <SidePannel/>
          <div className="mainPannel">
            {this.props.children}
          </div>
        </div>
        <Notifications/>
      </div>
    );
  }
}

Layout.propTypes = {
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,
  loading: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    loading: state.ajaxCallsInProgress > 0,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      register: registerWithEmailPassword,
      signInwithEmailPassword: signInwithEmailPassword,
      signOut,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
