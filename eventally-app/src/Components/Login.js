import React, { useState, useEffect } from 'react';
import '../App.css';

import { Auth, Hub } from 'aws-amplify';

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import HttpsIcon from '@material-ui/icons/Https';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckIcon from '@material-ui/icons/Check';

import Sidebar from "./Sidebar";
import Main from "./Main"

const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signUp'
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

function Login() {
  const [formState, updateFormState] = useState(initialFormState)
  const [user, updateUser] = useState(null)

  // persists user information
  useEffect(() => {
    checkUser()
    setAuthListener()
  }, [])

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signOut':
          updateFormState(() => ({ ...formState, formType: "signUp" }))
          break;
        default:
          break;
      }
    })
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      updateUser(user)
      updateFormState(() => ({ ...formState, formType: "signedIn" }))
    } catch (err) {
      updateUser(null) // could leave empty
    }
  }

  function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
  }

  // functions for each form type, using Auth
  const { formType } = formState
  async function signUp() {
    const { username, email, password } = formState
    await Auth.signUp({ username, password, attributes: { email }})
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }))
  }
  async function confirmSignUp() {
    const { username, authCode } = formState
    await Auth.confirmSignUp(username, authCode)
    updateFormState(() => ({ ...formState, formType: "signIn" }))
  }
  async function signIn() {
    const { username, password } = formState
    await Auth.signIn(username, password)
    updateFormState(() => ({ ...formState, formType: "signedIn" }))
  }

  Auth.currentAuthenticatedUser()
    .then(data => console.log(data.attributes))
    .catch(err => console.log(err));

  const classes = useStyles();
  return (
    <Card className={classes.root} alignItems="center" className="App">
    {
      formType == 'signUp' && (
        <CardContent>
          <CardContent> <EmojiEmotionsIcon color="primary"/> <Input name="username" onChange={onChange} placeholder="Email" /> </CardContent>
          <CardContent> <CheckIcon color="primary"/> <Input name="email" onChange={onChange} placeholder="Confirm Email" /> </CardContent>
          <CardContent> <HttpsIcon color="primary"/> <Input name="password" type="password" onChange={onChange} placeholder="Password" /> </CardContent>
          <CardContent> <Button variant="contained" color="primary" onClick={signUp}>Sign Up</Button>
                        <Button variant="contained" color="primary" onClick={() => updateFormState(() => ({
            ...formState, formType: "signIn"
          }))}>Sign In</Button> </CardContent>
        </CardContent>
      )
    }

    {
      formType == 'confirmSignUp' && (
        <div>
          <CardContent> <Input name="authCode" onChange={onChange} placeholder="Confirmation Code" /> </CardContent>
          <CardContent> <Button variant="contained" color="primary" onClick={confirmSignUp}>Confirm Sign Up</Button> </CardContent>
        </div>
      )
    }
    
    {
      formType == 'signIn' && (
        <div>
          <CardContent> <Input name="username" onChange={onChange} placeholder="username" /> </CardContent>
          <CardContent> <Input name="password" type="password" onChange={onChange} placeholder="password" /> </CardContent>
          <CardContent> <Button variant="contained" color="primary" onClick={signIn}>Sign In</Button> </CardContent>
        </div>
      )
    }

    {
      formType == 'signedIn' && (
        <div className="welcomAlignment">
          <Sidebar />
          <h1>Welcome, user </h1>
          <Main/>

          <Button variant="contained" color="primary" onClick={
            () => Auth.signOut()
          }>Sign Out</Button>
        </div>
      )
    }
    </Card>
  );
}

export default Login;