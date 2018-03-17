import React from 'react';
import {connect} from 'react-redux';

import {FormGroup, Form, ControlLabel, FormControl, HelpBlock, Col, Button} from 'react-bootstrap';
import {registerWithEmailPassword, signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';

class RegisterLink extends React.Component {

  constructor(props) {
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.state = {emailAddress: '', passwordValue: '', displayName: ''}
  }

  registerSubmit(e) {
    e.preventDefault();
    this.props.actions.register(this.state.emailAddress, this.state.passwordValue, this.state.displayName);
    debugger;
  }

  handleEmailChange(event) {
    this.setState({emailAddress: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passwordValue: event.target.value});
  }

  handleDisplayNameChange(event) {
    this.setState({displayName: event.target.value});
  }

  render() {
    let result =
      this.props.registrationStatus ?
        <div>

        <div>Your registration is successful , please login with your email password :)</div>

        </div>
        :
        (
          <Form horizontal={true} onSubmit={this.registerSubmit}>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}> Email Address </Col>
              <Col sm={10}>
                <FormControl type="email" value={this.state.emailAddress} onChange={this.handleEmailChange}
                             placeholder="Enter email"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}> Password </Col>
              <Col sm={10}>
                <FormControl type="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}
                             placeholder="Enter password"/>
              </Col>
            </FormGroup>


            <FormGroup controlId="">
              <Col componentClass={ControlLabel} sm={2}> DisplayName </Col>
              <Col sm={10}>
                <FormControl type="input" value={this.state.displayName} onChange={this.handleDisplayNameChange}
                             placeholder="Enter Display Name"/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}
                   className="error"> {(this.props.registrationError) ? ('*' + this.props.registrationError) : ''}</Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button className="uoRButton" type="submit">Register</Button>
              </Col>
            </FormGroup>

          </Form>
        );
    return result;
  }
};

RegisterLink.propTypes = {
  action: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      register: registerWithEmailPassword,
      signOut,
    }, dispatch)
  };
}


function mapStateToProps(state) {
  debugger;
  return {
    registrationError: state.registrationReducer.registrationError,
    registrationStatus: state.registrationReducer.registrationStatus
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterLink);

