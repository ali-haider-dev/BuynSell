import React from 'react'
import './style.css'
import { useState, useEffect } from 'react'
import { signIn } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MineNavigationBar from '../../Component/ViewNavigationBar'
import signupimage from '../../images/signin-img.png'
import Button from '../../Component/Button'

const SigninView = () => {

    // states for storing user details
    const [userEmail, setUserEmail] = useState()
    const [userPswrd, setUserPswrd] = useState()

    // collecting users details from input fields
    const getUserEmail = (e) => { setUserEmail(e.target.value) }
    const getUserPswrd = (e) => { setUserPswrd(e.target.value) }

    // state for btn loading
    const [isBtnLoader, setIsBtnLoader] = useState(false)

    // state for showing message 
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState()

    //  Signing user 
    const signinUser = (e) => {
        e.preventDefault()
        setIsBtnLoader(true)
        // calling function from firebase 
        signIn(userEmail, userPswrd)
            .then(res => {
                setIsBtnLoader(false)
                setShowSuccessMsg(true)
            })
            .catch(e => {
                setIsBtnLoader(false)
                setShowErrorMsg(e.message)
            })
    }
    const history = useHistory();
    return <>
        <MineNavigationBar />
        <Container>
            <Row>
                <Col md="6">
                    <div className='page-details'>
                        <img className="fadeIn" src={signupimage}></img>
                        <h1>WELCOME TO BUYN<span className="color-style">SELL.</span></h1>
                        <p>Sign in to continue!</p>
                        <p>If you don't have an account You can <a style={{ color: '#fff' }} onClick={() => { history.push('/signup') }}>Register here!</a></p>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-container fadeIn" stye={{ marginTop: '5rem !importtant' }}>
                        <h1>SIGNIN</h1>
                        <p>Signin to continue!</p>
                        <Form onSubmit={(e) => { signinUser(e) }}>
                            {showSuccessMsg ? <Alert className="alert-style" color="success">Thanks for signing up.</Alert> : showErrorMsg && <Alert className="alert-style" color="danger">{showErrorMsg}</Alert>}
                            <FormGroup>
                                <Input type="mail" placeholder='Enter your email' onChange={getUserEmail}></Input>
                                <Input type="password" placeholder='Enter password' onChange={getUserPswrd}></Input>

                                {isBtnLoader ? <Button name="SIGNING IN..." type="submit" /> : <Button name="SIGN IN" type="submit" />}
                            </FormGroup>
                        </Form>
                        <p>If you don't have an account You can <a style={{ color: '#fdd932' }} onClick={() => { history.push('/signup') }}>Register here!</a></p>
                    </div>

                </Col>
            </Row>
        </Container>
    </>


}
export default SigninView