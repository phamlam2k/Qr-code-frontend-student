import { Redirect, Route } from "react-router-dom"
import { isLogin } from "../config/function"
import { HOME } from "../config/path"

const PublicRoute = ({component : Component, restricted, ...rest}) => {
    return (
        <Route {...rest} 
            component={props => (
                isLogin() && restricted ? <Redirect to={HOME}/>
                : <Component {...props}/>
            )}
        />
    )
}

export default PublicRoute
