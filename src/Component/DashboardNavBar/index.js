import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faColumns, faUsers, faUserShield, faProcedures, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


import {
    
    Navbar,
    
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import './style.css'

const DashboardNavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory()
    const toggle = () => setIsOpen(!isOpen);
    return <>

        <div className="my-navigations">
            <Navbar className="nav-link" expand="md">
                <NavbarBrand className="navbar-brand" href="/">BUYN<span className="color-style">SELL.</span></NavbarBrand>
                <Nav className="ml-auto">
                
                <NavItem>
                    {props.userAvatar ? <NavLink>
                        <div className="user-details-box" onClick={props.showUserProfile}>
                            <h1>{props.userAvatar}</h1>
                        </div>
                        </NavLink> : null}
                        
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.logout}><FontAwesomeIcon icon={faSignOutAlt} /></NavLink>
                    </NavItem>
                    
                </Nav>

            </Navbar>
        </div>

    </>
}
export default DashboardNavBar