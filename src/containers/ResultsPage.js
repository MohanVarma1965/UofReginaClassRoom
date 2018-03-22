import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ColumnChart, PieChart} from 'react-chartkick';

window.Chart = require('chart.js');

class ResultsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answersArray: []
    };
    this.renderResults = this.renderResults.bind(this);
  }

  renderResults() {
    let currentUrl = window.location.href;
    let currentRoom = currentUrl.split('?') ? currentUrl.split('?')[1] : "";

    let chartArray = [];
    let classData = this.props.listOfAllClasses[currentRoom];

    let questions = classData.questions;
    let answersArray = [];
    let studentResponse = [];

    let studentIDs = classData.studentIDs;


    questions.map((question, index) => {
      answersArray.push(question.answer);
    });

    for (let studentID in studentIDs) {
      let correctAnswers = 0;
      let percentage = 0;
      if (studentIDs[studentID] && studentIDs[studentID].answers) {
        studentIDs[studentID].answers.map((answer, index) => {
          if (answer == answersArray[index]) {
            correctAnswers++;
          }
        });
      }

      if(questions && questions.length){
        percentage = correctAnswers/questions.length * 100;
      }
      studentResponse.push([studentID, percentage]);
    }



    return studentResponse;
  }

  render() {
    return (<ColumnChart colors={["#ff9800", "#666"]} suffix='%' discrete={true} stacked={true} xtitle='StudentIDs' ytitle='Correct Answers' download={true}
                         data={this.renderResults()}/>)
  }
}

ResultsPage.propTypes = {
};

function mapStateToProps(state) {
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
