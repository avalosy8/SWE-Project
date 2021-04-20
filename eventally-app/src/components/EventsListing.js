import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



import '../styles/events.css';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      textAlign: 'center'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/************ DynamoDB stuff ******************/ 
const { v4: uuidv4 } = require('uuid'); 
uuidv4();
const AWS = require("aws-sdk");
AWS.config.update ({
  region: "us-east-1",
  accessKeyId: "AKIAXJ3VTSS354FEHLFV",
  secretAccessKey: "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"  
});

const dynamodb = new AWS.DynamoDB.DocumentClient(); //simplified dynamodb library


function putEvents(event){

    var params3 = {};
    params3.TableName = "Events";
    params3.Item = {
    EventId: 4, //partition key
        Date: event.start.date, //sort key
        name: event.summary
    };
    dynamodb.put(params3, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
    });
}
/************ DynamoDB stuff ******************/ 

function EventsListing(){

    var CLIENT_ID = "592427108490-6g68m3d237a6qrmj4cb3lkbr676k58bp.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBsREDtXFIMT5YLHib-qIQRBSsM0m8l2Ws"

    var gapi = window.gapi;
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    var CALENDAR_ID = 'o8ptlkm1n15a6q4pj7as0vlp98@group.calendar.google.com'
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [click, setClick] = useState(0);

    // when clicked, show events
    useEffect(() => {
        if(click == 0) {
        return
        }
        function start() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(function() {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`
                })
            }).then(response => {
                const events =  response.result.items
                console.log('EVENTS: ', events)
                return ({events})
                })
                // .then(json => setCalendarEvents(JSON.stringify(json,null,4)))
                .then(json => setCalendarEvents(json))

        }      
      gapi.load('client', start)
        
    }, [click])

    console.log('C_EVENTS: ', calendarEvents)

    const classes = useStyles();
    const classes2 = useStyles2();


    return (
        <div className="App">
        <header className="App-header">
          <h1>Upcoming Events</h1>
            {/* <p>Click to output calendar events </p> */}
            { /* part of handleClick */ }
            {/* <button style={{width: 100, height: 50}} onClick={handleClick}>Get Events</button> */}
            <button style={{width: 100, height: 50}} onClick={e => setClick(click+1)}>Get Events</button>


            {calendarEvents.events && <div>
                {calendarEvents.events.map((ev,key) => {
                    putEvents(ev);
                    return(
                      <div class="card1">
                    <div className={classes2.root}>
                      
                        <div className="title">{ev.summary}</div>
                        <div className="date">{ev.start.date}</div>
                      
                      

                        {/* <Paper className={classes2.paper}>
                            <Grid item xs>
                                <Typography variant="h5" key={key}>{ev.summary}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" key={key}>{ev.start.date}</Typography>
                            </Grid>
                        </Paper> */}
                    </div>

                    </div>
                    );
                })}
            </div>}

        </header>
        </div>
    )
}

export default EventsListing;