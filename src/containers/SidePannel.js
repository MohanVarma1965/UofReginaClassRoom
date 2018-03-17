import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {authLoggedInSuccess, hasLoginToken, signInwithEmailPassword, signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';

class SidePannel extends React.Component {

  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {emailAddress: '', passwordValue: ''}
  }

  loginSubmit(e) {
    e.preventDefault();

    this.props.actions.signInwithEmailPassword(this.state.emailAddress, this.state.passwordValue);
    debugger;
  }

  handleEmailChange(event) {
    this.setState({emailAddress: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passwordValue: event.target.value});
  }


  render() {
    return (
      <div className="sidePannel">

        {this.props.auth.isLogged ?
          "" :
          <Link to='/login'>
            <div className="sidePannel-item"> Login</div>
          </Link>
        }
        {this.props.auth.isLogged ?
          "":
          <Link to='/register'>
            <div className="sidePannel-item"> Register </div>
          </Link>
        }

        <Link to='/lecturerHomepage'>
          <div className="sidePannel-item"> Lecturer Homepage </div>
        </Link>

        <Link to='/joinClassRoom'>
          <div className="sidePannel-item"> Join a Room </div>
        </Link>

        <Link to='/lecturerHomepage'>
          <div className="sidePannel-item"> About UoRClassRoom </div>
        </Link>
      </div>
    );
  }
};

SidePannel.propTypes = {
  signInwithEmailPassword: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    loginStatus: state.loginReducer.loginStatus,
    loginError: state.loginReducer.loginError,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      signInwithEmailPassword,
      signOut,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePannel);

