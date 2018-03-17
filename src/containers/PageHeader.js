import React from 'react';
import {connect} from 'react-redux';
import {signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';

class PageHeader extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="header-container">
        <div className="logo">UoRClassRoom</div>
        <div className="header-name">
          {this.props.auth.isLogged
          && this.props.user
          && this.props.user.displayName ? ("welcome " + this.props.user.displayName): ""}</div>
        {this.props.auth.isLogged ? <Button className="uoRButton" onClick={this.props.actions.signOut}> Sign out </Button> : ""}
      </div>
    )

  }
}

PageHeader.propTypes = {
  action: React.PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
    loginStatus: state.loginReducer.loginStatus,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signOut,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);

