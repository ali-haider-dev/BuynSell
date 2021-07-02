import React from 'react'
import { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import './style.css'

const MineNavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return <>

        <div className="my-navigations">
            <Navbar className="nav-link" expand="md">
                <NavbarBrand className="navbar-brand" href="/">BUYN<span className="color-style">SELL.</span></NavbarBrand>
               
            </Navbar>
        </div>

    </>
}
export default MineNavigationBar