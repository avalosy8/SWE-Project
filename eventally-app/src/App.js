import './App.css';
import Login from "./Components/Login";
import GoogleCalendar from "./Components/GoogleCalendar";
import React, { useEffect, useState } from 'react';
import Sidebar from "./Components/Sidebar";

import Navbar from './Components/navbar';
import Routes from './routes/routes';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

const { v4: uuidv4 } = require('uuid'); 
uuidv4();
const AWS = require("aws-sdk");
AWS.config.update ({
  region: "us-east-1",
  accessKeyId: "AKIAXJ3VTSS354FEHLFV",
  secretAccessKey: "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"  
});

const dynamodb = new AWS.DynamoDB.DocumentClient(); //simplified dynamodb library

// const eventId = uuidv4(); //generate unique user id (uuid)
// const date = "2021-05-01"; //find way to change based on user input
// var pointvalue; //change based on user input

// //repeat for more items and then use "put"
// var params = {
//   TableName : 'Events',
//   Item: {
//      EventId: {eventId}, //partition key
//      Date: {date}, //sort key
//      name: "Meet and Greet",
//      pointvalue: {pointvalue}
//   }
// };

// const userId = uuidv4(); //change to cognito id and use id as partition key
// var pointcount;
// //dont use sort key or use sort key of pointcount to sort users by highest to lowest count
// var params2 = {
//   TableName : 'Points',
//   Item: {
//      UserId: {userId}, //partitionkey
//      pointcount: {pointcount},
//      name: "Amanda"
//   }
// };

// //1. Create an Event/User in point database
// //use params and change values
// dynamodb.put(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// //2. Read Event/User in point database
// //use params and change values
// documentClient.get(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });
// //or query
// documentClient.query(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// //3. Update Event/User in point database
// //use params and change values
// documentClient.update(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// //4. Delete Event/User in point database 
// //use params and change values
// documentClient.delete(params, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

// testing out db stuff, this works
// const putItem = () => {
// var params3 = {};
// params3.TableName = "Events";
// params3.Item = {
//   EventId: 4, //partition key
//      Date: "today", //sort key
//      name: "Meet and Greet"
// };
// dynamodb.put(params3, function(err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });
// }



function App() {
  return (
    <div>
      <>
      <Navbar />
      <Routes />
      </>
    </div>
  );
}

export default App;