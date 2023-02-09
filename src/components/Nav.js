import { Fragment } from "react";
import {NavLink, Link } from "react-router-dom";
import classes from './Nav.module.css'
const Nav=()=>{
    return(
       
        <Fragment>
            <nav className={classes.nav} >
                <ul>
                    <NavLink to='/currentcity'>Current City</NavLink>
                    <NavLink to='/searchcity'>Search City</NavLink>
                </ul>
            </nav>
        </Fragment>
    )
}
export default Nav;