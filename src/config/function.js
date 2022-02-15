import { USER_INFO } from "./const"

export const isLogin = () => {
    return !!localStorage.getItem(USER_INFO)
}

export const bindParams = (str, params = {}) => {
    let result = str
    for (let key in params) {
        result = result.replace(new RegExp(`:${key}`, 'g'), params[key])
    }
    return result
}
