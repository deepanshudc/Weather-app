import Nav from "./Nav"
import {Outlet} from 'react-router-dom'
import classes from './RootLayout.module.css'
const RootLayout=()=>{
    return(
        <div className={classes.main}>
        <h1>Weather App</h1>
        <Nav></Nav>
        <Outlet></Outlet>
        </div>
    )
}
export default RootLayout