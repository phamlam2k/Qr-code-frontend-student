import { Redirect, Route } from "react-router-dom"
import { isLogin } from "../config/function"
import { USER_LOGIN } from "../config/path"

const PrivateRoute = ({component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            component={(props) => 
                !isLogin() ? <Redirect to={USER_LOGIN} /> : <Component {...props} />
            }
        />
    )
}

export default PrivateRoute
