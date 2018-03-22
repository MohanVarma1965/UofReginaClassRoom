import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, Form, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';

class CreateClassRoom extends React.Component {

  constructor(props) {
    super(props);
    this.saveRoom = this.saveRoom.bind(this);
    this.state = {noOfQuestions: ''};
  }

  saveRoom(e) {
    e.preventDefault();

    this.props.actions.saveRoom(this.state.noOfQuestions);
  }


  render() {
    return (
      <Form horizontal onSubmit={this.saveRoom}>

        <ControlLabel> Class Room Number </ControlLabel>

        <FormGroup controlId='formHorizontalCreateRoom'>
          <Col componentClass={ControlLabel} sm={2}> Enter Number of Questions </Col>
          <Col sm={10}>
            <FormControl type='text' value={this.state.noOfQuestions} onChange={this.noOfQuestions}
                         placeholder='No of Questions'/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type='submit'> Save Room </Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }
}

CreateClassRoom.propTypes = {
  actions: React.PropTypes.object.isRequired,
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
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassRoom);
