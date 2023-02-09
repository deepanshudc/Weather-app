import { Fragment } from "react"
import { useRouteError } from "react-router-dom"

const Error=()=>{
    const error=useRouteError()
    return(
    <Fragment>
        <h1>An error occured</h1>
        <p>{error}</p>
    </Fragment>
    )
}

export default Error