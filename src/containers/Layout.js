import React from 'react';
import {connect} from 'react-redux';
import SidePannel from '../components/SidePannel';

import Notifications from './Notifications';

import PageHeader from '../containers/PageHeader';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    return (
      <div className='layout-container'>
        <PageHeader />
        <div className='pannels-container'>
          <SidePannel  auth = {this.props.auth} />
          <div className='mainPannel'>
            {this.props.children}
          </div>
        </div>
        <Notifications/>
      </div>
    );
  }
}

Layout.propTypes = {
  auth: React.PropTypes.object.isRequired,
  children: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Layout);
