import "../App.css";
import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

import img1 from '../img1.png'
import img2 from '../img2.png'

function LoginPage({formState, updateFormState}) {

    const { formType } = formState

// functions for each form type, using Auth
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

function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
  }

    return(
        <div className="container">
            <div className="user signInBox">
                <div className="imgBox"><img src={img1}/></div>
                <div className="formBox">
                    <form>
                        <h2>Sign In</h2>

                        {
                        formType == 'confirmSignUp' && (
                            <div className="user signInBox">
                            <input name="authCode" onChange={onChange} placeholder="Confirmation Code" />
                            <button onClick={confirmSignUp}>Confirm Sign Up</button>
                            </div>
                        )
                        }
                        {
                        formType == 'signIn' && (
                            <div className="user signInBox">
                            <input name="username" onChange={onChange} placeholder="username" />
                            <input name="password" type="password" onChange={onChange} placeholder="password" />
                            <button onClick={signIn}>Sign In</button>
                            </div>
                        )
                        }

                        {
                        formType == 'signedIn' && (
                            <div className="user signInBox">
                            <h1>Welcome, user</h1>
                            <button onClick={
                                () => Auth.signOut()
                            }>Sign Out</button>
                            </div>
                        )
                        }

                    </form>
                </div>
            </div>
            
            <div className="user signupBox">
                <div className="formBox">
                    <form>
                        <h2>Create an account</h2>

                        {
                            formType == 'signUp' && (
                                <div>
                                <input type="text" name="username" onChange={onChange} placeholder="username" />
                                <input type="password" name="password" type="password" onChange={onChange} placeholder="password" />
                                <input name="email" onChange={onChange} placeholder="email" />
                                <button onClick={signUp}>Sign Up</button>
                                {/* removed because users can choose to be taken to sign in page*/}
                            {/*    <button onClick={() => updateFormState(() => ({
                                    ...formState, formType: "signIn"
                                }))}>Sign In</button>
                            */}
                                </div>
                            )
                        }
                        {/* takes user to sign in page */}
                        <p className="signup">Already have an account? <a href="#" onClick={() => updateFormState(() => ({
                                                                                ...formState, formType: "signIn"
                                                                            }))}>Sign in.</a></p>
                    </form>
                </div>
                <div className="imgBox"><img src={img2}/></div>
            </div>
        </div>
    ); // end of return
}
export default LoginPage;