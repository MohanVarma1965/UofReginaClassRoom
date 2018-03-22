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
import {saveQuiz, deleteRoom} from '../actions/lecturerActions'

class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.saveQuiz = this.saveQuiz.bind(this);
    this.questionDescription = this.questionDescription.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.optionA = this.optionA.bind(this);
    this.optionB = this.optionB.bind(this);
    this.optionC = this.optionC.bind(this);
    this.optionD = this.optionD.bind(this);
    this.answer = this.answer.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.state = {
      questionDescription: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
      questions: [],
      error: false
    }
  }


  questionDescription(e) {
    this.setState({questionDescription: e.target.value});
  }

  optionA(e) {
    this.setState({optionA: e.target.value});
  }

  optionB(e) {
    this.setState({optionB: e.target.value});
  }

  optionC(e) {
    this.setState({optionC: e.target.value});
  }

  optionD(e) {
    this.setState({optionD: e.target.value});
  }

  answer(e) {
    this.setState({answer: e.target.value});
  }


  nextQuestion() {

    let error = (this.state.questionDescription && this.state.optionA && this.state.optionB && this.state.optionC && this.state.optionD && this.state.answer) ? false : true;
    this.setState({error: error});
    if (error) {
      return;
    }

    let currentQuestion = {
      question: this.state.questionDescription,
      options: [this.state.optionA, this.state.optionB, this.state.optionC, this.state.optionD],
      answer: this.state.answer
    };

    this.state.questions.push(currentQuestion);

    // Reset the state to normal
    this.setState({
      questionDescription: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
      error: false
    })
  }

  saveQuiz(e) {
    this.setState({error: false});
    e.preventDefault();

    this.nextQuestion();
    console.log(this.state.questions);
    this.props.actions.saveQuiz(this.state.questions, this.props.currentClassRoom);

    console.log("this is to save the quiz");

  }

  deleteRoom() {
    this.props.actions.deleteRoom(this.props.currentClassRoom);
  }

  render() {
    return (

      <Form horizontal onSubmit={this.saveQuiz}>

        <FormGroup controlId='formHorizontalcurrentRoom'>
          <Col componentClass={ControlLabel} sm={10}> Class Room Number {this.props.currentClassRoom} </Col>
          <Col componentClass={ControlLabel} sm={10}> Question Number {this.state.questions.length + 1} </Col>

        </FormGroup>

        <FormGroup controlId='formHorizontalQuestionDescription'>
          <Col componentClass={ControlLabel} sm={6}> Enter Question Description</Col>
          <Col sm={10}>
            <FormControl type='text' value={this.state.questionDescription} onChange={this.questionDescription}
                         placeholder='Question Description' required/>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalOptionDescription'>
          <Col componentClass={ControlLabel} sm={10}> Enter Option Descriptions </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalOptionA'>
          <Col sm={10}>
            <FormControl type='text' value={this.state.optionA} onChange={this.optionA}
                         placeholder='Description For Option A' required/>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalOptionB'>
          <Col sm={10}>
            <FormControl type='text' value={this.state.optionB} onChange={this.optionB}
                         placeholder='Description For Option B' required/>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalOptionC'>
          <Col sm={10}>
            <FormControl type='text' value={this.state.optionC} onChange={this.optionC}
                         placeholder='Description For Option C' required/>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalOptionD'>
          <Col sm={10}>
            <FormControl type='text' value={this.state.optionD} onChange={this.optionD}
                         placeholder='Description For Option D' required/>
          </Col>
        </FormGroup>

        <FormGroup controlId='formHorizontalAnswer'>
          <Col componentClass={ControlLabel} sm={10}> Select Correct Answer
            <select required className='questionFormSelect' value={this.state.answer} onChange={this.answer}>
              <option value='0'>A</option>
              <option value='1'>B</option>
              <option value='2'>C</option>
              <option value='3'>D</option>
            </select>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <div className='error'> {this.state.error ? "*Please enter all fields" : ""}</div>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <Button onClick={this.nextQuestion} className='questionFormButton'> Next Question </Button>
            <Button type='submit' className='uoRButton save'> Save Quiz </Button>
            <Button className='uoRButton questionFormButton quit' onClick={this.deleteRoom}> Delete Quiz</Button>
          </Col>
        </FormGroup>

      </Form>
    );
  }
};

CreateQuestion.propTypes = {
  saveRoomAction: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    currentClassRoom: state.classRoomReducer.currentClassRoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveQuiz,
      deleteRoom
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
