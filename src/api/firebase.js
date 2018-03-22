import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config/';

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

  /*
    static signInWithGitHub() {
      return firebase.auth().signInWithPopup(provider());
    }*/

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static pushQuestionsToDatabase(questions, currentClassRoom) {

    let user = firebase.auth().currentUser;

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(currentClassRoom).child('questions')
        .set(questions, (error) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            // console.log("data set correctly");
            resolve("success");
          }
        });
    });
  }

  static createRoom(classRoom) {
    let user = firebase.auth().currentUser;
    let valuemod = {
      RoomValue: classRoom,
      owner: user.uid,
      saved: false,
      hosted: false,
      endHostedQuiz: false,
      questions: [],
      studentIDs: []
    }

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(classRoom)
        .set(valuemod, (error) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            // console.log("data set correctly");
            resolve(classRoom);
          }
        });
    });
  }

  static getAllClasses() {

    let userID = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms/')
        .on('value', function (snapshot) {
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
        .remove((error) => {
          if (error) {
            // console.log(error);
            reject(error);
          } else {
            // console.log("data set correctly");
            resolve(classRoom);
          }
        });
    });
  }

  static joinClassRoom(studentID, roomNumber) {

    let modifiedValue = {
      studentID: studentID
    }

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${roomNumber}`).child(`studentIDs/${studentID}`)
        .set(modifiedValue, (error) => {
          if (error) {
            // console.log(error);
            reject(error);
          } else {
            // console.log("data set correctly");
            resolve(roomNumber);
          }
        });
    });
  }

  static hostQuiz(currentClassRoom) {
    return new Promise((resolve, reject) => {
      var updates = {};
      updates['/hosted/'] = true;
      firebase
        .database()
        .ref(`users/classRooms/${currentClassRoom}`)
        .update(updates);
    });
  }

  static endHostedQuiz(currentClassRoom) {
    return new Promise((resolve, reject) => {
      var updates = {};
      updates['/endHostedQuiz/'] = true;
      firebase
        .database()
        .ref(`users/classRooms/${currentClassRoom}`)
        .update(updates);
    });
  }

  static resetHostedQuiz(currentClassRoom) {
    return new Promise((resolve, reject) => {
      var updates = {};
      updates['/endHostedQuiz/'] = false;
      updates['/hosted/'] = false;
      firebase
        .database()
        .ref(`users/classRooms/${currentClassRoom}`)
        .update(updates);
    });
  }

  static submitQuiz(currentClassRoom, studentID, answers) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${currentClassRoom}/studentIDs/${studentID}/answers`)
        .set(answers, (error) => {
          if (error) {
            // console.log(error);
            reject(error);
          } else {
            resolve(currentClassRoom);
          }
        });
    });
  }

  static databaseQuestionsFetch(studentID, roomNumber) {

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`users/classRooms/${roomNumber}/`)
        .on('value', function (snapshot) {
          let resolvedValues = [];
          resolvedValues.push(snapshot.val().questions);
          resolvedValues.push(snapshot.val().hosted);
          resolvedValues.push(snapshot.val().endHostedQuiz);
          resolve(resolvedValues);
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
      console.log(firebase.database().currentUser);
    })
  }

  static signInwithEmailPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

}

export default FirebaseApi;
