import React, { useEffect, useState } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { signOut, getCurrentUserDetails, updatingUserData, uploadUserProfileImg, storingUserProfileImg } from '../../Config/firebase'
import DashboardNavBar from '../../Component/DashboardNavBar'
import Button from '../../Component/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingScreen from '../../Component/LoadingScreen'
import profileImg from '../../images/profileviewimg.png'

const UserProfileView = (props) => {

    // state for currentUserDetails
    const [currentUserData, setCurrentUserData] = useState([])

    useEffect(() => {
        console.log(`currentuser on profile page ${props.x.uid}`)
        getCurrentUserDetails(props.x.uid)
            .then(user => {
                let splittedUserName = user[0].userName.split(' ')
                let firstAlpha = splittedUserName[0].split('')[0]

                setUserAvatar(firstAlpha)
                console.log(user)
                let userdata = user[0]
                setCurrentUserData([userdata])
                setUserDocID(user[1])

            })
    }, [currentUserData])

    //state for user avatar
    const [userAvatar, setUserAvatar] = useState('')



    // states for storing user details
    const [userName, setUserName] = useState()
    const [userContactNumber, setUserContactNumber] = useState()

    // state for storing user doc ID
    const [userDocID, setUserDocID] = useState()

    // state for opening edit mode 
    const [isEditMode, setEditMode] = useState(false)

    // calling edit mode on click 
    const runEditMode = (e) => {
        e.preventDefault()
        setEditMode(true)
        console.log('edit mode on')
    }



    // collecting users details from input fields
    const getUserNameForUpd = (e) => { setUserName(e.target.value) }
    const getUserNumForUpd = (e) => { setUserContactNumber(e.target.value) }

    // updating user data
    const updUserData = (e) => {
        e.preventDefault()
        setEditMode('onupd')
        console.log(`userName ${userName} Contact ${userContactNumber}`)
        updatingUserData(userName, userContactNumber, userDocID)
            .then(res => {
                history.push('/userprofileview')
                setEditMode(false)
            })
    }
    // signing out user
    const signOutUser = () => {
        signOut()
            .then(res => { console.log("user is signout!") })
            .catch(error => { console.log(error.message) })
    }

    const history = useHistory()

    return <>
        <DashboardNavBar userAvatar={
            currentUserData.map(data => {
                console.log(data.profileImg)
                if (data.profileImg) { return <img src={data.profileImg} /> }
                else { return <p style={{ marginTop: '5px' }}>{userAvatar}</p> }
            })
        } logout={signOutUser} showUserProfile={() => { history.push('/userprofileview') }} />
        <Container>

            <section className="user-profile fadeIn">
                <Row>
                    <Col md='4'>
                        <button className="goback-btn" style={{ marginTop: '6rem' }} onClick={() => { history.goBack() }}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> GO BACK
                        </button>
                        <div className="dp-container">
                            {currentUserData.map(data => {
                                console.log(data.profileImg)
                                if (data.profileImg) {
                                    return <img src={data.profileImg} />
                                }
                                else {
                                    return <p>{userAvatar}</p>
                                }
                            })}


                        </div>
                        <Label className="btn"> SET PROFILE PICTURE
                        <Input type="file"
                                onChange={(e) => {
                                    console.log(e.target.files)

                                    uploadUserProfileImg(e.target.files)
                                        .then(url => {
                                            console.log(url)
                                            storingUserProfileImg(url, userDocID)
                                                .then(res => { console.log('img uploaded') })
                                                .catch(error => { console.log(error.message) })
                                        })
                                        .catch(error => { console.log(error) })
                                }
                                } required />
                        </Label>
                        <br></br>


                    </Col>
                    <Col md='8'>
                        <div className="user-profile-details  fadeIn">

                            <Form>
                                <FormGroup>
                                    <h1>YOUR PROFILE DETAILS</h1>
                                    <br></br>
                                    <br></br>
                                    {console.log(currentUserData)}
                                    {isEditMode ? <>
                                        <Label>Your Full Name</Label>
                                        <Input type='text' placeholder="Your Name" onChange={getUserNameForUpd} required />
                                        <Label>Your Email Address</Label>

                                        <Input type='mail' value='You can not update email!' />
                                        <Label>Your Contact Number</Label>

                                        <Input type='number' placeholder="Your Contact Number" onChange={getUserNumForUpd} required />
                                    </> :

                                        currentUserData.map(user => {

                                            return <>
                                                <Label>Your Full Name</Label>
                                                <Input type='text' value={user.userName} />
                                                <Label>Your Email Address</Label>

                                                <Input type='mail' value={user.userEmail} />
                                                <Label>Your Contact Number</Label>

                                                <Input type='number' value={user.userContactNumber} />
                                            </>


                                        })}


                                </FormGroup>
                                {isEditMode ? <button className="btn" onClick={updUserData}>UPDATE</button> :
                                    <button className="btn" onClick={runEditMode}>
                                        {isEditMode === 'onupd' ? 'UPDATING' : 'EDIT'}
                                    </button>}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </section>
        </Container>
    </>
}
export default UserProfileView