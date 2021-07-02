import React from 'react'
import './style.css'
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MineNavigationBar from '../../Component/ViewNavigationBar'
import Button from '../../Component/Button'
import signupimage from '../../images/signup-img.png'
import { useState, useEffect } from 'react'
import { signUp, storeUserDetail } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'

const SignupView = () => {

  // states for storing user details
  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPswrd, setUserPswrd] = useState()
  const [userRepeatedPswrd, setUserRepeatedPswrd] = useState()
  const [userContactNumber, setUserContactNumber] = useState()

  // collecting users details from input fields
  const getUserEmail = (e) => { setUserEmail(e.target.value) }
  const getUserName = (e) => { setUserName(e.target.value) }
  const getUserPswrd = (e) => { setUserPswrd(e.target.value) }
  const getUserRepeatedPswrd = (e) => { setUserRepeatedPswrd(e.target.value) }
  const getUserContactNumber = (e) => { setUserContactNumber(e.target.value) }

  // state for btn loading
  const [isBtnLoader, setIsBtnLoader] = useState(false)

  // state for showing message 
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showErrorMsg, setShowErrorMsg] = useState()

  // Registering user 
  const registerUser = (e) => {
    e.preventDefault()
    setIsBtnLoader(true)

    // validating both pswrds should be same 
    if (userPswrd === userRepeatedPswrd) {


      // calling firebase register Method
      signUp(userEmail, userPswrd)
        .then(res => {
          console.log(`user ID ${res.user.uid}`)
          storeUserDetail(userName, userEmail, userContactNumber, res.user.uid)
            .then(res => {
              setIsBtnLoader(false)
              setShowSuccessMsg(true)
            })

            .catch(error => {
              setIsBtnLoader(false)
              setShowErrorMsg(error.message)
            })
        })

        .catch(error => {
          setIsBtnLoader(false)
          setShowErrorMsg(error.message)
        })
    } else {
      setIsBtnLoader(false)
      setShowErrorMsg('Please make sure your passwords match')
    }
  }

  const history = useHistory();

  return <>
    <MineNavigationBar />

    <Container>
      <Row>
        <Col md="6">
          <div className='page-details'>
            <img className="fadeIn" src={signupimage}></img>
            <h1>BUYN<span className="color-style">SELL.</span></h1>
            <p>Buynsell makes it so easy to connect people to buy, sell or exchange used goods and services. It's completely free, and it can be used from a laptop or mobile phone.</p>
            <p>Already have an account? <a style={{ color: '#fff' }} onClick={() => { history.push('/') }}> Login</a></p>
          </div>
        </Col>
        <Col md="6">
          <div className="form-container fadeIn">
            <h1>SIGNUP</h1>
            <p>Create your account.</p>

            {showSuccessMsg ? <Alert className="alert-style" color="success">Thanks for signing up.</Alert> : showErrorMsg && <Alert className="alert-style" color="danger">{showErrorMsg}</Alert>}
            <Form onSubmit={(e) => { registerUser(e) }}>
              <FormGroup>
                <Input type="mail" placeholder='Enter your email' onChange={getUserEmail}></Input>
                <Input type="text" placeholder='Enter your full name' onChange={getUserName}></Input>
                <Input type="password" placeholder='Enter password' onChange={getUserPswrd}></Input>
                <Input type="password" placeholder='Repeat your password' onChange={getUserRepeatedPswrd} ></Input>
                <Input type="number" placeholder='Enter Your Contact Number' onChange={getUserContactNumber} ></Input>
                {isBtnLoader ? <Button name="SIGNING UP..." type="submit" /> : <Button name="SIGN UP" type="submit" />}


              </FormGroup>
            </Form>
            <p>Already have an account? <a style={{ color: '#fdd932' }} onClick={() => { history.push('/') }}> Login</a></p>
          </div>

        </Col>
      </Row>
    </Container>
  </>




}
export default SignupView