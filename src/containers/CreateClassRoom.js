import React from 'react';
import '../components/Header/header.css';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {FormGroup, Form, ControlLabel, FormControl, HelpBlock, Col, Button} from 'react-bootstrap';
import {authLoggedInSuccess, hasLoginToken, signInwithEmailPassword, signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';
import {push} from "react-router-redux";
import {providerLoginSuccess, userLoadedSuccess} from "../actions/user";
import {beginAjaxCall} from "../actions/ajaxStatus";

class CreateClassRoom extends React.Component {

  constructor(props) {
    super(props);
    this.saveRoom = this.saveRoom.bind(this);

    this.state = {noOfQuestions: ''}
  }

  saveRoom(e) {
    e.preventDefault();

    this.props.actions.saveRoom(this.state.noOfQuestions);
    debugger;
  }


  render() {
    return (
      <Form horizontal onSubmit={this.saveRoom}>

        <ControlLabel> Class Room Number </ControlLabel>

        <FormGroup controlId="formHorizontalCreateRoom">
          <Col componentClass={ControlLabel} sm={2}> Enter Number of Questions </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.noOfQuestions} onChange={this.noOfQuestions}
                         placeholder="No of Questions"/>
          </Col>
        </FormGroup>

        <CreateQuestion />

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit"> Save Room </Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }
};

CreateClassRoom.propTypes = {
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
      saveRoomAction,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassRoom);