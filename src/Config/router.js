import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import SignupView from '../Views/SignUp'
import SigninView from '../Views/SignIn'
import Dashboard from '../Views/Dashboard'
import PostAd from '../Views/PostAd'
import AdsDetailsView from '../Views/AdsDetailView'
import UserProfileView from '../Views/UserProfile'


export default function ViewsNavigation({ currentUser }) {
    return (
        <Router>
            <div>

                <Switch>
                    <Route exact path="/" exact>
                       
                    

                        {authChecker(!currentUser, <SigninView />, '/dashboard')}
                    </Route>
                    <Route path="/signup">
                    

                        {authChecker(!currentUser, <SignupView  />, '/dashboard')}


                    </Route>
                    <Route path="/dashboard" exact>
                        {/* {console.log(`Current User ID ${}`)} */}
                        {authChecker(currentUser, <Dashboard x={currentUser}/>)}


                    </Route>
                    <Route path="/adpostview" exact>
                    

                        {authChecker(currentUser, <PostAd x={currentUser} />)}


                    </Route>
                    <Route path="/dashboard/details/:adsID" exact>
                    

                        {authChecker(currentUser, <AdsDetailsView x={currentUser}/>)}


                    </Route>
                    <Route path="/userprofileview">
                    
                        {authChecker(currentUser, <UserProfileView x={currentUser} />)}
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    );
}
// function for auth checker
const authChecker = (user, component, path = "/") => {
    return user ? component : <Redirect to={path} exact />
}