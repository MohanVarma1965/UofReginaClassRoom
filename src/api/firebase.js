import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config/';
import {registrationCallError} from "../actions/registrationAction";

class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },

        error => reject(error)
      );
    });
  }

  static auth() {
    return firebase.auth;
  }

  static signInWithGitHub() {
    return firebase.auth().signInWithPopup(provider());
  }

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static questionsPushToDatabase(questions, currentClassRoom) {

    let user = firebase.auth().currentUser;
    debugger;

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(currentClassRoom).child('questions')
        .set(questions, (error) => {
          if (error) {
            debugger;
            console.log("Error in data setting");
            console.log(error);
            reject(error);
          } else {
            console.log("data set correctly");
            resolve("success");
          }
        });
    });
  }

  static cloudDatabasePush(value) {

    let user = firebase.auth().currentUser;
    debugger;
    let classRoom = `CS${value}`;

    let valuemod = {
      RoomValue: classRoom,
      owner: user.uid,
      saved: false,
      hosted: false,
      questions: [],
      studentIDs: []
    }

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(classRoom)
        .set(valuemod, (error) => {
          if (error) {
            console.log("Error in data setting");
            console.log(error);
            reject(error);
          } else {
            console.log("data set correctly");
            resolve(classRoom);
          }
        });
    });
  }

  static getAllClasses() {

    let userID = firebase.auth().currentUser.uid;
    debugger;

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms/')
        .on('value', function(snapshot) {
          debugger;
          resolve(snapshot.val());
          // ...
        });
    });
  }



  static deleteRoom(classRoom) {

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(classRoom)
        .remove( (error) => {
          if (error) {
            debugger;
            console.log("Error in data setting");
            console.log(error);
            reject(error);
          } else {
            debugger;
            console.log("data set correctly");
            resolve(classRoom);
          }
        });
    });
  }

  static joinClassRoom(studentID, roomNumber) {

    let modifiedValue = {
          studentID : studentID
    }

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${roomNumber}`).child(`studentIDs/${studentID}`)
        .set(modifiedValue, (error) => {
          if (error) {
            debugger;
            console.log(error);
            reject(error);
          } else {
            console.log("data set correctly");
            resolve(roomNumber);
          }
        });
    });
  }


  static submitQuiz(currentClassRoom, studentID, answers) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${currentClassRoom}/studentIDs/${studentID}/answers`)
        .set(answers, (error) => {
          if (error) {
            debugger;
            console.log(error);
            reject(error);
          } else {
            console.log("Answers are posted");
            resolve(currentClassRoom);
          }
        });
    });
  }


  static databaseQuestionsFetch(studentID, roomNumber) {

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${roomNumber}/questions`)
        .on('value', function(snapshot) {
        debugger;
        resolve(snapshot.val());
        // ...
      });
    });
  }





  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {
    return firebase
      .database()
      .ref(path)
      .set(value);
  }


  static registerWithEmailPassword(email, password, displayName) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      firebase.auth().currentUser.updateProfile({displayName: displayName});
      console.log("firebase.database().currentUser");
      console.log(firebase.database().currentUser);
    })
  }

  static signInwithEmailPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

}

export default FirebaseApi;
