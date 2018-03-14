import React from 'react';
import '../components/Header/header.css';
import {connect} from 'react-redux';
import {FormGroup, Form, ControlLabel, FormControl, HelpBlock, Col, Button} from 'react-bootstrap';
import {authLoggedInSuccess, hasLoginToken, signInwithEmailPassword, signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';
import {push} from "react-router-redux";
import {providerLoginSuccess, userLoadedSuccess} from "../actions/user";
import {beginAjaxCall} from "../actions/ajaxStatus";
import { Link, Redirect } from 'react-router';
import {createRoom} from '../actions/lecturerActions';

class LecturerHomePage extends React.Component {

  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoomNo = this.enterRoomNo.bind(this);
    this.state = {classRoomNumber: ''}
  }

  createRoom(e) {
    e.preventDefault();
    this.props.actions.createRoom(this.state.classRoomNumber);
  }

  enterRoomNo(event) {
    this.setState({classRoomNumber: event.target.value});
  }

  render() {
    return (

      <Form horizontal onSubmit={this.createRoom}>
        <FormGroup controlId="formHorizontalRoomNumber">
          <Col componentClass={ControlLabel} sm={2}> Enter Room Number </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.classRoomNumber} onChange={this.enterRoomNo}
                         placeholder="Room Number" required/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit"> Create Room </Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }
};

LecturerHomePage.propTypes = {
  saveRoomAction: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  debugger;
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
      createRoom,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturerHomePage);
