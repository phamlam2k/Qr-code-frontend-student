import { 
    HOME, 
    POST, 
    QR, 
    USER_INFO, 
    USER_LOGIN,
    POST_DETAIL,
    LIST
} from "../config/path";

export const routes = [
    {
        path: HOME,
        exact: true,
        isPrivate: true,
        component: import("../components/home/Home")
    },
    {
        path: USER_LOGIN,
        exact: true,
        isPrivate: false,
        restricted: true,
        component: import("../components/auth/Login")
    },
    {
        path: QR,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import("../components/qrcode/Check")
    },
    {
        path: USER_INFO,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import("../components/user/User")
    },
    {
        path: POST,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import("../components/post/Post")
    },
    {
        path: POST_DETAIL,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import("../components/post/PostDetail")
    },
    {
        path: LIST,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import("../components/list/List")
    }

]