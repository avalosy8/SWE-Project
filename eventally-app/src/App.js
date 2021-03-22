import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js'

import { Auth, Hub } from 'aws-amplify';

const initialFormState = {
  // shows signup form first by default
  // formType allows toggle between form types
  username: '', password: '', email: '', authCode: '', formType: 'signUp'
}

function App() {
  // allows update state
  const [formState, updateFormState] = useState(initialFormState)
  // persists user info
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

  return (
    // passing down formState and updateFormState to LoginPage component
    <LoginPage formState={formState} updateFormState={updateFormState}/>
  );
}

export default App;