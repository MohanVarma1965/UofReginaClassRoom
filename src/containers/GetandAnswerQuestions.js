import React from 'react';
import {connect} from 'react-redux';
import {
  FormGroup,
  Form,
  ControlLabel,
  Col,
  Button,
  Radio
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {submitQuiz} from '../actions/student';

class GetandAnswerQuestions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      error: false,
      answersArray: []
    };
    this.submitQuiz = this.submitQuiz.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.checkForError = this.checkForError.bind(this);
  }

  checkForError() {
    let answerArray = this.state.answersArray;
    let noOfQuestions = this.props.questions.length;

    for (let i = 0; i < noOfQuestions; i++) {
      if (!answerArray[i]) {
        return true;
      }
    }
    return false;
  }

  answerSelected(e) {
    let indexes = e.target.value ? e.target.value.split(',') : "";
    let questionIndex = indexes[0];
    let optionIndex = indexes[1];

    let answerArrayL = this.state.answersArray;
    answerArrayL[questionIndex] = optionIndex;
    this.setState({answersArray: answerArrayL});
  }

  submitQuiz(e) {
    e.preventDefault();
    let error = this.checkForError();
    this.setState({error: error});

    if (error) {
      return
    }
    this.props.actions.submitQuiz(this.props.currentClassRoom, this.props.studentID, this.state.answersArray);
  }


  renderQuestions() {
    return <Form horizontal onSubmit={this.submitQuiz}>
      {this.props.questions.map((question, questionIndex) => {
        return (
          <Form >
            <FormGroup className="questionsGroup">
              <Col componentClass={ControlLabel} sm={10}> {questionIndex + 1 + ")"} {question.question} </Col>
              <Col smOffset={4} sm={10}>
                {question.options.map((option, optionIndex) => {
                  return (<Radio className='individual-option' required name='radioGroup' onChange={this.answerSelected}
                                 value={questionIndex + ',' + optionIndex}>
                    {option}
                  </Radio>);
                })}
              </Col>
            </ FormGroup>
          </Form>);
      })}

      <FormGroup>
        <Col sm={10}>
          <div className='error'> {this.state.error ? "*Please enter all fields" : ""}</div>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type='submit'> Submit Quiz </Button>
        </Col>
      </FormGroup>
    </Form>
  }

  render() {
    let renderData;

    if (this.props.hosted && !this.props.endHostedQuiz) {
      let questions = this.props.questions ? this.renderQuestions() :
        <div> There are no questions to display, please re check and join the correct class room</div>;
      return questions;
    } else {
      return this.props.hosted ? this.props.endHostedQuiz ?
        <div className='error'> The Lecturer has ended the quiz</div> :
        "" : <div className='error'> The Quiz is not hosted</div>
    }
  }
}

GetandAnswerQuestions.propTypes = {
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    questions: state.classJoinReducer.questions,
    currentClassRoom: state.classJoinReducer.currentClassRoom,
    studentID: state.classJoinReducer.studentID,
    hosted: state.classJoinReducer.hosted,
    endHostedQuiz: state.classJoinReducer.endHostedQuiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      submitQuiz
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetandAnswerQuestions);
