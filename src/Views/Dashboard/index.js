import React, { useEffect, useState } from 'react'
import './style.css'
import { signOut, getAdPostDetails, getCurrentUserDetails } from '../../Config/firebase'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Input } from 'reactstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import DashboardNavBar from '../../Component/DashboardNavBar'
import Button from '../../Component/Button'
import dashboardImg from '../../images/bermuda-783.png'
import LoadingScreen from '../../Component/LoadingScreen'
const Dashboard = (props) => {

    useEffect(() => {

        // getting current user data for making default user avatar
        getCurrentUserDetails(props.x.uid)
            .then(user => {
                console.log(user)
                let splittedUserName = user[0].userName.split(' ')
                let firstAlpha = splittedUserName[0].split('')[0]
                let userdata = user[0]
                setCurrentUserData([userdata])
                setUserAvatar(firstAlpha)
            })

        setIsLoader(true)

        // getting ad post details
        getAdPostDetails()
            .then(res => {
                setIsLoader(false)
                setAdsDetails(res)
            })
            .catch(error => { console.log(error) })
        { console.log(`Current login user ID ${props.x.uid}`) }
    }, [])

    const history = useHistory();

    // state for storing ads details
    const [adsDetails, setAdsDetails] = useState([])

    // state for showing loader
    const [isLoader, setIsLoader] = useState(false)

    //state for user avatar
    const [userAvatar, setUserAvatar] = useState('')

    // state for currentUserDetails
    const [currentUserData, setCurrentUserData] = useState([])


    const [searchValue, setSearchValue] = useState('')
    const getSearchValue = (e) =>{
        
        setSearchValue(e.target.value)

    }
    const filteredAds = adsDetails.filter(ads=>{
        
         return ads.adTitle.toLowerCase().includes( searchValue.toLowerCase() )
    })
 
    
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
                if (data.profileImg) { return <img src={data.profileImg} /> }
                else { return <p style={{ marginTop: '5px' }}>{userAvatar}</p> }
            })} logout={signOutUser} showUserProfile={() => { history.push('/userprofileview') }} />
        <section>
            <Container>
                <Row>
                    <Col md="12">
                        <div className="header-box fadeIn">
                            <Row>
                                <Col md="6">
                                    <h1>BUYN<span style={{ color: '#fdd932' }}>SELL.</span></h1>
                                    <p>Buynsell makes it so easy to connect people to buy, sell or exchange used goods and services. It's completely free, and it can be used from a laptop or mobile phone.</p>
                                    <button className="ad-post-btn" onClick={() => { history.push('./adpostview') }}>POST AD</button>
                                </Col>
                                <Col md="6">
                                    <img src={dashboardImg}></img>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row>
               <Input type="text"  className="search-bar" placeholder="Search Ad" onChange={getSearchValue} />

                <h2>ALL ADS</h2>

                <div className="ads-container fadeIn">
                   
                    {isLoader ? <LoadingScreen /> : filteredAds.map(items => {
                        return <>

                            <div
                                style={{ textAlign: "center", height: 'auto', width: '250px', borderRadius: '5px', backgroundColor: "#fff", margin: '6px', cursor: 'pointer' }}
                                onClick={() => { history.push(`/dashboard/details/${items.adsID}`) }}>
                                <img
                                    style={{ height: '150px', width: '100%', borderRadius: '5px' }}
                                    src={items.adImgUrl[0]} height='200px' width="100%" />
                                <h4>{items.adTitle}</h4>
                                <h6>$ {items.adPrice}</h6>
                            </div>
                        </>
                    })

                    }
                </div>
            </Container>
        </section>
    </>
}
export default Dashboard