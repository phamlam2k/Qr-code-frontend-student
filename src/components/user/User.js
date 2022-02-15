import { Image, Typography } from "antd"
import PrivateLayout from "../../layout/PrivateLayout"
import "./User.css"

const { Title } = Typography

const User = () => {
    const student = JSON.parse(localStorage.getItem("user_info"))
    
    return (
        <PrivateLayout>
            <Title level={2} style={{textAlign: 'center', marginTop : '30px'}}>Student Info</Title>
            <div className="user-content">
                <div className="user-img">
                    <Image src={student?.photo}/>
                </div>
                <div style={{marginTop: "30px"}}>
                    <Title level={3}>ID Student : </Title>
                    <Typography>{student?.id_student}</Typography>

                    <Title level={3}>Name : </Title>
                    <Typography>{student?.name}</Typography>

                    <Title level={3}>Email : </Title>
                    <Typography>{student?.email}</Typography>
                </div>
            </div>
        </PrivateLayout>
    )
}

export default User
