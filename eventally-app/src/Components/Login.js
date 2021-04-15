import React, { useState, useEffect } from 'react';
import '../App.css';

import { Auth, Hub } from 'aws-amplify';

import Sidebar from "./Sidebar";
import Main from "./Main"

const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signUp'
}

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

  return (
    <div className="App">
    {
      formType == 'signUp' && (
        <div>
          <input name="username" onChange={onChange} placeholder="username" />
          <input name="password" type="password" onChange={onChange} placeholder="password" />
          <input name="email" onChange={onChange} placeholder="email" />
          <button onClick={signUp}>Sign Up</button>
          <button onClick={() => updateFormState(() => ({
            ...formState, formType: "signIn"
          }))}>Sign In</button>
        </div>
      )
    }

    {
      formType == 'confirmSignUp' && (
        <div>
          <input name="authCode" onChange={onChange} placeholder="Confirmation Code" />
          <button onClick={confirmSignUp}>Confirm Sign Up</button>
        </div>
      )
    }
    
    {
      formType == 'signIn' && (
        <div>
          <input name="username" onChange={onChange} placeholder="username" />
          <input name="password" type="password" onChange={onChange} placeholder="password" />
          <button onClick={signIn}>Sign In</button>
        </div>
      )
    }

    {
      formType == 'signedIn' && (
        <div className="welcomAlignment">
          <Sidebar />
          <h1>Welcome, user </h1>
          <Main/>

          <button onClick={
            () => Auth.signOut()
          }>Sign Out</button>
        </div>
      )
    }
    </div>
  );
}

export default Login;