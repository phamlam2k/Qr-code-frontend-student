import React, {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Loading from '../components/aloading/Loading'
import Home from '../components/home/Home'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { routes } from './routes'

const AppRouter = () => {
    return (
        (
            <Router>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {routes.map((route, key) => {
                            const {path, exact, isPrivate, component, restricted} = route
                            const props = {
                                key,
                                path,
                                exact,
                                component: lazy(() => new Promise(resolve => setTimeout(() => resolve(component), 1000)))
                            }
                            return isPrivate ? <PrivateRoute {...props}/> : <PublicRoute restricted={restricted} {...props} />
                        })}
                        <PrivateRoute component={Home} />
                    </Switch>
                </Suspense>
            </Router>
        )
    )
}

export default AppRouter
