import React from 'react'
import './style.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useHistory, useParams } from 'react-router-dom'
import { getSpecifiedAdDetail, signOut, getCurrentUserDetails } from '../../Config/firebase'
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import DashboardNavBar from '../../Component/DashboardNavBar'
import Button from '../../Component/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingScreen from '../../Component/LoadingScreen'

const AdsDetailsView = (props) => {

    const history = useHistory()
    const { adsID } = useParams()

    //state for storing ad details
    const [adDetails, setAdDetails] = useState([])

    //state for user avatar
    const [userAvatar, setUserAvatar] = useState('')

    // state for showing loader
    const [isLoader, setIsLoader] = useState(false)

    // state for currentUserDetails
    const [currentUserData, setCurrentUserData] = useState([])


    useEffect(() => {

        // getting current user data for making default user avatar
        getCurrentUserDetails(props.x.uid)
            .then(user => {
                console.log(user[0].userName)
                let splittedUserName = user[0].userName.split(' ')
                let firstAlpha = splittedUserName[0].split('')[0]
                let userdata = user[0]
                setCurrentUserData([userdata])
                setUserAvatar(firstAlpha)
            })
        setIsLoader(true)

        // getting specified adDetails
        getSpecifiedAdDetail(adsID)
            .then(res => {
                console.log(res)
                setAdDetails(res)
                setIsLoader(false)
            })
            .catch(error => {
                setIsLoader(false)
                console.log(error)
            })
    }, [])

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
                if (data.profileImg) { return <img src={data.profileImg} height='100%' width="100%" /> }
                else { return <p style={{ marginTop: '5px' }}>{userAvatar}</p> }
            })
        } logout={signOutUser} showUserProfile={() => { history.push('/userprofileview') }} />


        <Container>
            {isLoader ? <LoadingScreen /> :
                <Row>
                    <Col md="6">
                        <div className="ad-image-container fadeIn">

                            {adDetails.map(items => {
                                return <>
                                    <Carousel>
                                        {items.adImgUrl.map(url => {
                                            return (
                                                <div>
                                                    <img style={{ borderRadius: "5px" }} src={url} />
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </>
                            })
                            }
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="ad-details-container fadeIn">
                            <button className="goback-btn" onClick={() => { history.goBack() }}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> GO BACK
                     </button>
                            <br></br>
                            <h1>AD DETAILS</h1>
                            {adDetails.map(item => {
                                return <>
                                    <h4>TITLE</h4>
                                    <p>{item.adTitle}</p>
                                    <h4> PRICE </h4>
                                    <p> $ {item.adPrice}</p>
                                    <h4> DESCRIPTION </h4>
                                    <p>{item.adDescription}</p>
                                    <h4>CITY</h4>
                                    <p>{item.cityName}</p>
                                    {console.log(item.userContactNumber)}
                                    <Button name={`Call ${item.userName} (Seller)`}> <a href={`tel: ${item.userContactNumber}`}></a> </Button>
                                </>
                            })}
                        </div>
                    </Col>
                </Row>}
        </Container>



    </>
}
export default AdsDetailsView