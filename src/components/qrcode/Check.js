import QrReader from "react-qr-reader"
import moment from 'moment';
import axios from 'axios'
import { API_ATTENDANCE } from "../../config/endpointApi";
import { Link, useHistory } from "react-router-dom";
import { HOME } from "../../config/path";
import { notification } from "antd";

import "./Check.css"

const Check = () => {
    const history = useHistory()
    const {id_student} = JSON.parse(localStorage.getItem("user_info"))

    const onScan = (value) => { 
        const data = {
            subject : value,
            time: moment().format("HH:mm:ss"),
            date: moment().format("YYYY-MM-DD"),
            id_student: id_student
        }

        if(value !== null){
            axios.post(API_ATTENDANCE, data)
                .then((res) => {
                    if(res?.data?.code === 200){
                        notification.success({
                             message: res?.data?.message
                        })
                        history.push(HOME)
                    }else if(res?.data?.code === 404) {
                        notification.warning({
                            message: res?.data?.message
                        })
                        history.push(HOME)
                    }
                })
        }
    }

    const onError = (value) => {
        notification.error({
            message: "Please try again !!!"
        })
    }

    return (
        <div className="check">
            <p className="qr-code-check-title">
                Qr-code scan
            </p>
            <QrReader
                className="qr-code-check"
                onScan={onScan}
                onError={onError}
            />

            <button className="qr-code-check-btn"><Link to={HOME}>Back to Home</Link></button>
        </div>

    )
}

export default Check
