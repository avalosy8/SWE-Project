import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth, Hub } from 'aws-amplify';
import { 
MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon, 
MDBCard, MDBCardImage, MDBCardBody, MDBCardText, MDBCardTitle, 
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from "mdbreact";
const initialFormState = {
  username: '', password: '', email: '', authCode: '', formType: 'signUp'
}

function App() {
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
    updateFormState({ ...formState, formType: "confirmSignUp" })
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
  console.log(user);

  return (
    <MDBContainer> 

      {/* Nav bar WIP, need to add links etc */}
      <MDBNavbar color="light-blue" fixed="top" dark expand="md" >
          <strong className="white-text">WECE</strong>
      </MDBNavbar>

    <MDBCard wide cascade className="centered"> <MDBCardBody cascade>
    {
      formType == 'signUp' && (
        <div>
          
          <MDBCardTitle className='text-center'>Sign Up</MDBCardTitle>
          <MDBInput label="Username" name="username" icon="user" onChange={onChange} placeholder="username" />
          <MDBInput label="Password" name="password" icon="lock" type="password" onChange={onChange} placeholder="password" />
          <MDBInput label="Email" name="email" icon="envelope" onChange={onChange} placeholder="email" />
            <div className="text-center">
            <button type="button" className="btn btn-primary btn-floating" onClick={signUp}>Sign Up</button>
            {/* <MDBBtn className= "btn-primary" onClick={signUp}>Sign Up</MDBBtn> */}
            {/* <MDBBtn onClick={async () => {await this.signUp();}}>Sign Up</MDBBtn> */}
            <button type="button" className="btn btn-primary btn-floating" onClick={() => updateFormState(() => ({
              ...formState, formType: "signIn"
            }))}>Sign In</button>
            </div>
        </div>
      )
    }
    
    {
      formType == 'confirmSignUp' && (
        <div>
          <MDBCardTitle className='text-center'>Enter Confirmation Code</MDBCardTitle>
          <MDBInput label="Confirmation Code" name="authCode" onChange={onChange} placeholder="Confirmation Code" />
            <div className="text-center">
            <button type="button" className="btn btn-primary btn-floating" onClick={confirmSignUp}>Confirm Sign Up</button>
            </div>
        </div>
      )
    }
    
    {
      formType == 'signIn' && (
        <div>
          <MDBCardTitle className='text-center'>Sign In</MDBCardTitle>
          <MDBInput label="Username" name="username" icon="user" onChange={onChange} placeholder="username" />
          <MDBInput label="Password" name="password" icon="lock" type="password" onChange={onChange} placeholder="password" />
            <div className="text-center">
            <button type="button" className="btn btn-primary btn-floating" onClick={signIn}>Sign In</button>
            </div>
        </div>
      )
    }

    {
      formType == 'signedIn' && (
        <div className="text-center">
          <h2>Successfully logged in!</h2>
          {/* check for null user */}
          <h1>Email: {user.attributes.email}</h1>
          <button type="button" className="btn btn-primary btn-floating" onClick={
            () => Auth.signOut()
          }>Sign Out</button>
        </div>
      )
    }
    </MDBCardBody> </MDBCard> 
    </MDBContainer>
  );
}

export default App;