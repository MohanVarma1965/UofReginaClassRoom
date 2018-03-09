import React from 'react';
import '../components/Header/header.css';
import {connect} from 'react-redux';
import {FormGroup, Form, ControlLabel, FormControl, HelpBlock, Col, Button} from 'react-bootstrap';
import {authLoggedInSuccess, hasLoginToken, signInwithEmailPassword, signOut} from "../actions/auth";
import {bindActionCreators} from 'redux';
import {providerLoginSuccess, userLoadedSuccess} from "../actions/user";

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
    this.state = {
      questionDescription: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: '',
      questions: []
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


  nextQuestion(e) {
    e.preventDefault();

    let options = {options: [this.state.optionA, this.state.optionB, this.state.optionC, this.state.optionD]},
        answer = {answer: this.state.answer},
        currentQuestion = {question: this.state.questionDescription, options: options, answer: answer};

    this.state.questions.push(currentQuestion);

    // Reset the state to normal
    this.setState ({questionDescription: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: ''})
  }

  saveQuiz(e) {
    e.preventDefault();

    console.log("this is to save the quiz");

  }

  render() {
    return (

      <Form horizontal onSubmit={this.saveQuiz}>

        <FormGroup controlId="formHorizontalQuestionDescription">
          <Col componentClass={ControlLabel} sm={2}> Enter Question </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.questionDescription} onChange={this.questionDescription}
                         placeholder="Question Description"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalOptionA">
          <Col componentClass={ControlLabel} sm={2}> Enter Option A </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.optionA} onChange={this.optionA}
                         placeholder="Option Description"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalOptionB">
          <Col componentClass={ControlLabel} sm={2}> Enter Option B </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.optionB} onChange={this.optionB}
                         placeholder="Option Description"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalOptionC">
          <Col componentClass={ControlLabel} sm={2}> Enter Option C </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.optionC} onChange={this.optionC}
                         placeholder="Option Description"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalOptionD">
          <Col componentClass={ControlLabel} sm={2}> Enter Option A </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.optionD} onChange={this.optionD}
                         placeholder="Option Description"/>
          </Col>
        </FormGroup>


        <FormGroup controlId="formHorizontalAnswer">
          <Col componentClass={ControlLabel} sm={2}> Enter Answer Option </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.answer} onChange={this.answer}
                         placeholder="Anser Option"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.nextQuestion}> Next </Button>
          </Col>
        </FormGroup>


        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit"> Save Quiz </Button>
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
  debugger;
  return {
    auth: state.auth,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
