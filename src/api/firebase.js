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

  static databasePush(path, value) {
    debugger;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            debugger;
            reject(error);
          } else {
            debugger;
            resolve();
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
      questions: []
    }

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users/classRooms').child(classRoom)
        .set(valuemod, (error) => {
          if (error) {
            debugger;
            console.log("Error in data setting");
            console.log(error);
            reject(error);
          } else {
            debugger;
            console.log("data set correctly");
            resolve("success");
          }
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
    debugger;
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      firebase.auth().currentUser.updateProfile({displayName: displayName});
      console.log("firebase.database().currentUser");
      console.log(firebase.database().currentUser);
    })
  }

  static signInwithEmailPassword(email, password) {
    debugger;
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

}

export default FirebaseApi;
