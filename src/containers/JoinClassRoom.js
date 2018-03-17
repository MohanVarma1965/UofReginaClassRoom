import React from 'react';
import {connect} from 'react-redux';
import {
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  Col,
  Button,
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {joinRoom} from '../actions/studentActions'

class JoinClassRoom extends React.Component {

  constructor(props) {
    super(props);
    this.studentID = this.studentID.bind(this);
    this.roomNumber = this.roomNumber.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.state = {
      studentID: '',
      roomNumber: ''
          }
  }

  studentID(e) {
    let studentID = e.target.value;
    this.setState({studentID:studentID});
  }

  roomNumber(e) {
    this.setState({roomNumber: e.target.value});
  }


  joinRoom(e) {
    e.preventDefault();
    this.props.actions.joinRoom(this.state.studentID, this.state.roomNumber);
    console.log("this is to Join the quiz");
  }


  render() {
    return (

      <Form horizontal onSubmit={this.joinRoom}>

        <FormGroup controlId="formHorizontalStudentID">
          <Col componentClass={ControlLabel} sm={10}> Enter StudentID</Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.studentID} onChange={this.studentID}
                         placeholder="Student ID" required/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalRoomNumber">
          <Col componentClass={ControlLabel} sm={10}> Enter Class Room Number to Join</Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.roomNumber} onChange={this.roomNumber}
                         placeholder="Class Room Number" required/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <Button type="submit"> Join Room </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
};

JoinClassRoom.propTypes = {
  saveRoomAction: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  debugger;
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      joinRoom
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinClassRoom);
