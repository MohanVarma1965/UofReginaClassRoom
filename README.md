# UofReginaClassRoom
UoRClassRoom is a noble assessment web application, which helps to increase student’s engagement in the classroom 
and track their performance with good interactive interfaces and analytics that can be used by lecturer to assess 
the student. In this project lecturer can create a class room and post his questions of his choice. Now student can 
join with the class room number created by lecturer and answer the questions. After the student answers the questions, 
lecturer can join into the room to see the results in column chats. I have used React for the front end view part and 
Redux to manage the application state. Redux communicates with Googles Firebase for authentication and also its NoSQL 
data base to manage the state of application. For deployment and hosting I have used the Firebase Hosting.

Click the below link to visit the hosted application

https://uoreginaclassroom.firebaseapp.com/lecturerHomePage 

The below structure gives you the complete idea of how the application is working

![alt text](https://github.com/MohanVarma1965/UofReginaClassRoom/blob/master/structure.PNG)


The below gives the flow of React Redux

![alt text](https://github.com/MohanVarma1965/UofReginaClassRoom/blob/master/ReactReduxFlow.gif)

Lecturer use cases:  Creates a classroom and observe the results of the students.

Preconditions:
a) Lecturer should be registered or else he should register first to login and create a classroom.
b) While registering lecturer should enter a password of at least 6 characters.
c) If lecturer wants students to join the classroom, lecturer should first host the classroom.

Post conditions:
a) Lecturer should end hosting so that no students answer after the stipulated time.
b) Lecturer can also reset the hosting if he wants to host the quiz again.
c) Lecturer should get classrooms and click on each classroom to see the results.

![alt text](https://github.com/MohanVarma1965/UofReginaClassRoom/blob/master/Lecturer%20usecase.jpg)


Student use case: Joining into his/her respective classroom.

Preconditions: Student has to know the classroom number to join.
Post conditions: Student will join the room and attempt the quiz in that specific room.


![alt text](https://github.com/MohanVarma1965/UofReginaClassRoom/blob/master/student.jpg)
