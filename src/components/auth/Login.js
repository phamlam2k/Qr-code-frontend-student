import {  Button, Form, Input, Layout, notification, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import bg from "../../assets/auth/logo_usth.png"
import InputCommon from '../../common/InputCommon'
import axios from "axios"
import { HOME } from '../../config/path'
import './Login.css'
import { API_LOGIN } from '../../config/endpointApi'

const { Content } = Layout 
const Login = () => {

    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const onFinish = (value) => {
        setLoading(true)
        
        axios.post(API_LOGIN, value)
        .then((res) => {
            if(res?.data?.code === 200){
                if(res?.data?.data?.admin === 2){
                    notification.success({
                        message: res?.data?.message
                    })
    
                    localStorage.setItem('user_info', JSON.stringify(res?.data?.data))
                    history.push(HOME)

                }else{
                    notification.error({
                        message: "This account is not for you"
                    })
                    setLoading(false)
                }
            }
            if(res.data.code === 500){
                notification.error({
                    message: res.data.message
                })
                setLoading(false)
            }
        })
    }

    return (
        <Content className='layout-login'>
            <img alt='' src={bg} className='layout-login-logo' />
            <Typography className='layout-login-title'>
                ATTENDANCE CHECKING <br /> SYSTEM
            </Typography>

            <Form layout={"vertical"} className='layout-login-form' onFinish={onFinish}>
                <Form.Item
                    name={"username"}
                    label="Student ID"
                    rules={[{
                        required:true,
                        message: "Please fill the input Student ID"
                    }]}
                    >
                    <InputCommon 
                        size={"large"} 
                        placeholder={"Input student ID"}
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    label="Password"
                    rules={[{
                        required:true,
                        message: "Please fill the input Password"
                    }]}
                >
                    <Input.Password 
                        placeholder={"Input password"}
                        size={"large"} />
                </Form.Item>

                <Typography className='layout-login-form-forgot'>
                    Forgot the password
                </Typography>

                <Button 
                    loading={loading}
                    type="primary" 
                    className='layout-login-form-button' 
                    htmlType="submit">
                    Login
                </Button>
                
            </Form>
        </Content>
    )
}

export default Login
