import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter= ()=>{
   
    return (
        <Router>
            <switch>
                {isLoggedIn? 
                ( <>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </>) : (
                <Route exact paht="/"> 
                    <Auth/> 
                </Route>
                )}
            </switch>
        </Router>
    )
}
export default AppRouter;