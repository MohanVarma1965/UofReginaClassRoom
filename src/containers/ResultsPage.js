import React from 'react';
import '../components/Header/header.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ColumnChart, PieChart} from 'react-chartkick';
window.Chart = require('chart.js');

class ResultsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answersArray: []
    }
    this.renderResults = this.renderResults.bind(this);
  }

  renderResults() {
    debugger;
    let currentUrl = window.location.href;
    let currentRoom = currentUrl.split('?') ? currentUrl.split('?')[1] : "";

    let chartArray = [];
    let classData = this.props.listOfAllClasses[currentRoom];

    console.log(classData);
    let questions = classData.questions;
    let answersArray = [];
    let studentResponse = [];

    let studentIDs = classData.studentIDs;


    questions.map((question, index) => {
      answersArray.push(question.answer);
    })

    for (var studentID in studentIDs) {
      let correctAnswers = 0;
      if (studentIDs[studentID] && studentIDs[studentID].answers) {
        studentIDs[studentID].answers.map((answer, index) => {
          if (answer == answersArray[index]) {
            correctAnswers++;
          }
        })
      }
      studentResponse.push([studentID, correctAnswers]);
    }

    return studentResponse;
  }

  render() {
    debugger;
    debugger;
    console.log(this.props.listOfAllClasses);
    return (<ColumnChart  discrete={true} stacked={true} xtitle="StudentIDs" ytitle="Correct Answers" download={true} data={this.renderResults() }/>)
  }
};

ResultsPage.propTypes = {};

function mapStateToProps(state) {
  debugger;
  return {
    listOfAllClasses: state.classRoomReducer.listOfAllClasses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
