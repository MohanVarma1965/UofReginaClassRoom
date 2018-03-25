import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, Form, ControlLabel, FormControl, HelpBlock, Col, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {Link, Redirect} from 'react-router';
import {createRoom, getAllClasses, hostQuiz, endHostedQuiz, resetHostedQuiz} from '../actions/lecturer';

class LecturerHomePage extends React.Component {

  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoomNo = this.enterRoomNo.bind(this);
    this.getAllClasses = this.getAllClasses.bind(this);
    this.displayAllEligibleClasses = this.displayAllEligibleClasses.bind(this);
    this.endHostedQuiz = this.endHostedQuiz.bind(this);
    this.resetHostedQuiz = this.resetHostedQuiz.bind(this);
    this.hostQuiz = this.hostQuiz.bind(this);
    this.state = {classRoomNumber: '', showGetAllRoomButton: true}
  }

  createRoom(e) {
    e.preventDefault();
    this.props.actions.createRoom(this.state.classRoomNumber);
  }

  enterRoomNo(event) {
    this.setState({classRoomNumber: event.target.value});
  }

  getAllClasses(e) {
    e.preventDefault();
    this.setState({showGetAllRoomButton: false});
    this.props.actions.getAllClasses();
  }

  hostQuiz(e) {
    this.props.actions.hostQuiz(e.target.value);
    this.props.actions.getAllClasses();
  }

  endHostedQuiz(e) {

    this.props.actions.endHostedQuiz(e.target.value);
    this.props.actions.getAllClasses();
  }


  resetHostedQuiz(e) {
    this.props.actions.resetHostedQuiz(e.target.value);
    this.props.actions.getAllClasses();
  }

  displayAllEligibleClasses() {
    let listOfClasses = this.props.listOfAllClasses;
    let userID = this.props.user.uid;

    let data = [];

    for (var prop in listOfClasses) {
      if (listOfClasses[prop].owner == userID) {
        let resultsPage = `/resultsPage?${prop}`;
        data.push(
          <div className='classRooms'>
            <Link to={`${resultsPage}`}><Button className='uoRButton'>{prop}</Button></Link>
            <Button className='save uoRButton' disabled={listOfClasses[prop].hosted ? true : false}
                    onClick={this.hostQuiz} value={prop}> Start
              Hosting </Button>
            <Button className='quit uoRButton'
                    disabled={listOfClasses[prop].hosted ? listOfClasses[prop].endHostedQuiz ? true : false : true}
                    onClick={this.endHostedQuiz}
                    value={prop}> End Hosting</Button>
            <Button className='save uoRButton' onClick={this.resetHostedQuiz} value={prop}> Reset </Button>
          </div>
        )
      }
    }
    return data;
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={this.createRoom}>
          <FormGroup controlId='formHorizontalRoomNumber'>
            <Col componentClass={ControlLabel} sm={2}> Enter Room Number </Col>
            <Col sm={10}>
              <FormControl type='text' value={this.state.classRoomNumber} onChange={this.enterRoomNo}
                           placeholder='Room Number' required/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit' className='uoRButton'> Create Room </Button>
            </Col>
          </FormGroup>
        </Form>

        <Form onSubmit={this.getAllClasses}>
          {this.state.showGetAllRoomButton ? <FormGroup controlId='GetListOfClasses'>
            <Col componentClass={ControlLabel} sm={10}> In order to see all the classes available click on the below
              link </Col>
            <Col smOffset={2} sm={10}>
              <Button type='submit' className='uoRButton'> Get Rooms </Button>
            </Col>
          </FormGroup> : ""}
        </Form>

        {this.props.listOfAllClasses ?
          <Form onSubmit={this.getResults}>
            <FormGroup controlId='GetListOfClasses'>
              {this.state.showGetAllRoomButton ? "" :
                <Col componentClass={ControlLabel} sm={10}> Click on each room to see the Students Performance </Col>}
              <Col smOffset={2} sm={10}>
                {this.displayAllEligibleClasses()}
              </Col>
            </FormGroup>
          </Form>
          : ""
        }
      </div>
    );
  }
}

LecturerHomePage.propTypes = {
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  saveRoomAction: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    listOfAllClasses: state.classRoomReducer.listOfAllClasses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createRoom,
      getAllClasses,
      hostQuiz,
      endHostedQuiz,
      resetHostedQuiz
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturerHomePage);
