import React from 'react'
import './style.css'
import { useState, useEffect } from 'react'
import { uploadFile, storeAdDetails, signOut, getCurrentUserDetails } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert, Select, Option } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import DashboardNavBar from '../../Component/DashboardNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Button from '../../Component/Button'
import img from '../../images/adpostimage.png'
const PostAdView = (props) => {


    //state for user avatar
    const [userAvatar, setUserAvatar] = useState('')

    // states for getting contact number & name  of current User 
    const [userContactNumber, setUserContactNumber] = useState()
    const [userName, setUserName] = useState()

    //states for storing ad post details
    const [adImgUrl, setAdImgUrl] = useState([])
    const [adTitle, setAdTitle] = useState()
    const [adDescription, setAdDescription] = useState()
    const [adPrice, setAdPrice] = useState()
    const [cityName, setCityName] = useState()



    // reseting form 
    const resetForm = () => {
        setAdImgUrl([])
        setIsLoader(false)
        setAdTitle('')
        setAdDescription('')
        setAdPrice('')
        setCityName('')
    }

    const history = useHistory()

    // state for showing message 
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState()

    // state for btn loading
    const [isBtnLoader, setIsBtnLoader] = useState(false)

    // state for loader 
    const [isLoader, setIsLoader] = useState(false)

    // state for currentUserDetails
    const [currentUserData, setCurrentUserData] = useState([])

    // getting current user data for making default user avatar
    useEffect(() => {
        getCurrentUserDetails(props.x.uid)
            .then(user => {
                console.log(user[0].userName)
                let splittedUserName = user[0].userName.split(' ')
                let firstAlpha = splittedUserName[0].split('')[0]
                setUserAvatar(firstAlpha)
                let userdata = user[0]
                setCurrentUserData([userdata])
                setUserContactNumber(user[0].userContactNumber)
                setUserName(user[0].userName)
            })
    }, [])

    // getting length of adImg array
    var adImgLength = adImgUrl.length;


    // storing ad details 
    const postAd = () => {
        if (!cityName) {
            setShowErrorMsg('Please Fill out all fields!')
        } else {
            setIsBtnLoader(true)
            storeAdDetails(adImgUrl, adTitle, adDescription, adPrice, cityName, userContactNumber, userName, props.x.uid)
                .then(res => {
                    setIsBtnLoader(false)
                    setShowSuccessMsg(true)
                })
                .catch(error => {
                    setIsBtnLoader(false)
                    console.log(setShowErrorMsg(error.message))
                })
        }

    }

    // handling error of Imgs
    const handleImgError = (e) => { setShowErrorMsg(e) }

    // signing out user
    const signOutUser = () => {
        signOut()
            .then(res => { console.log("user is signout!") })
            .catch(error => { console.log(error.message) })
    }



    return <>
        <DashboardNavBar userAvatar={
            currentUserData.map(data => {
                console.log(data.profileImg)
                if (data.profileImg) { return <img src={data.profileImg} height='100%' width='100%' /> }
                else { return <p style={{ marginTop: '5px' }}>{userAvatar}</p> }
            })
        } logout={signOutUser} showUserProfile={() => { history.push('/userprofileview') }} />
        <Container>
            <Row>
                <Col md="6">
                    <div className="image-container">
                        <img className="fadeIn" src={img}></img>
                    </div>
                </Col>
                <Col md="6">
                    <div className="adpostform-container fadeIn">
                        <button className="goback-btn" onClick={() => { history.goBack() }}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> GO BACK
                        </button>
                        <br></br>
                        <h1>POST YOUR AD</h1>
                        {showSuccessMsg ? <Alert className="alert-style" color="success">Your Ad is Successfully Uploaded!</Alert> : showErrorMsg && <Alert className="alert-style" color="danger">{showErrorMsg}</Alert>}

                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            postAd()
                            resetForm()

                        }}>
                            <FormGroup>

                                {adImgLength >= 5 ? <button className="file-input">NO MORE IMG ALLOWED</button> :
                                    <Label className="file-input">
                                        {isLoader === 'status' ? 'ADDING...' :
                                            isLoader === true ? 'ADD MORE' : 'ADD PICTURES'}
                                        <Input type="file"
                                            onChange={(e) => {
                                                console.log(e.target.files)
                                                setIsLoader('status')
                                                uploadFile(e.target.files)
                                                    .then(url => {
                                                        var arr = [...adImgUrl]
                                                        arr.push(url)
                                                        setAdImgUrl(arr)
                                                        setIsLoader(true)
                                                    })
                                                    .catch(error => { console.log(error) })
                                            }
                                            } required />
                                        {console.log(adImgUrl)}
                                    </Label>}

                                <Input type="text" placeholder="Ad title" value={adTitle} onChange={(e) => { setAdTitle(e.target.value) }} required />
                                <Input type="textarea" placeholder="Description" value={adDescription} onChange={(e) => { setAdDescription(e.target.value) }} required />
                                <Input type="number" placeholder="Price" value={adPrice} onChange={(e) => { setAdPrice(e.target.value) }} required />
                                <Input type="select" value={cityName} onChange={(e) => { setCityName(e.target.value) }}>
                                    <option>Your City Name</option>
                                    <option>Karachi</option>
                                    <option>Lahore</option>
                                    <option>Multan</option>
                                    <option>Quetta</option>
                                    <option>Bahawalpur</option>
                                    <option>Sukkur</option>
                                </Input>
                                {isBtnLoader ? <Button name="POSTING AD..." type="submit" /> : <Button name="POST AD" type="submit" />}
                            </FormGroup>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>

    </>
}
export default PostAdView