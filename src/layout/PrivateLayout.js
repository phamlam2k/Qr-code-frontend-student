
import { 
    HOME, 
    LIST, 
    POST, 
    QR, 
    USER_INFO 
} from "../config/path"
import { 
    HomeOutlined, 
    OrderedListOutlined, 
    QrcodeOutlined, 
    SolutionOutlined, 
    UserOutlined 
} from "@ant-design/icons/lib/icons"

import './PrivateLayout.css'
import { useHistory } from "react-router-dom"

const PrivateLayout = (props) => {
    const {children} = props
    const history = useHistory()

    const menuItems = [
        { key: HOME, path: HOME, content: "Home", icon: <HomeOutlined />},
        { key: POST, path: POST, content: "Post", icon: <SolutionOutlined />},
        { key: QR, path: QR, content : "QR Scan", icon: <QrcodeOutlined/>},
        { key: 'QR', path: QR, content : "", icon: <QrcodeOutlined/>},
        { key: LIST, path: LIST, content: "List", icon: <OrderedListOutlined />},
        { key: USER_INFO, path: USER_INFO, content : "User", icon: <UserOutlined />},
    ]

    const onSwitch = (path) => {
        history.push(path)
    }

    const menu = (
        <>
            {menuItems.map(( menuI, key) => {
                if(menuI.content === 'QR Scan'){
                    return(
                        <div key={menuI.key} className="private-layout-menu-qr" onClick={() => onSwitch(menuI.path)}>
                            {menuI.icon}
                            {menuI.content}
                        </div>
                    )
                }
                else{
                    return(
                        <div key={menuI.key} className="private-layout-menu-rest" onClick={() => onSwitch(menuI.path)}>
                            {menuI.icon}
                            {menuI.content}
                        </div>
                    )
                }
            })}
        </>
    )

    return (
        <div className="private-layout">
            <div className="private-layout-content">
                {children}
            </div>
            <div className="private-layout-menu">
                {menu}
            </div>
        </div>
    )
}

export default PrivateLayout
