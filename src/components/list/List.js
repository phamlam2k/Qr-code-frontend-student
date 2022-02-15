import { Button, Checkbox, Col, Row, Typography, notification } from "antd"
import axios from "axios"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { API_LIST } from "../../config/endpointApi"
import { bindParams } from "../../config/function"
import useListQuery from "../../hooks/useListQuery"
import PrivateLayout from "../../layout/PrivateLayout"

import "./List.css"
import ListModal from "./ListModal"

const List = () => {
    const id = JSON.parse(localStorage.getItem("user_info")).id
    const [isModalVisible, setIsModalVisible] = useState(false);
    const queryClient = useQueryClient()

    const {
        data: list
    } = useListQuery(id)

    const data = list?.data

    const onChange = (id, status) => {
        if(status === 0){
            axios.put(bindParams(API_LIST, {id}), {status: 1})
                .then((res) => {
                    notification.success({
                        message: "Congratulate you have to done your work"
                    })
                    queryClient.invalidateQueries(["list"])
                })
        }else{
            axios.put(bindParams(API_LIST, {id}), {status: 0})
                .then((res) => {
                    notification.success({
                        message: "Please done your work !!!"
                    })
                    queryClient.invalidateQueries(["list"])
                })
        }
    }

    const handleDelete = (id) => {
        axios.delete(bindParams(API_LIST, {id}))
            .then((res) => {
                if(res?.data?.code === 200){
                    notification.success({
                        message: res?.data?.message
                    })

                    queryClient.invalidateQueries(["list"])
                }else if(res?.data?.code === 404) {
                    notification.warning({
                        message: res?.data?.message
                    })
                }
            })
    }

    const handleOpen = () => {
        if(data?.length > 9){
            notification.warning({
                message: "Your list just contain 10 items"
            })
        }else{
            setIsModalVisible(true)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <PrivateLayout>
            <div className="list-header">
                <Typography.Title level={2}>List today</Typography.Title>
                <Button onClick={handleOpen} type="primary">Add list</Button>
            </div>
            <ListModal 
                isModalVisible={isModalVisible} 
                handleCancel={handleCancel}
                id={id}
                />
            {data?.map((li, index) => {
                return (
                    <Row align="middle" justify="space-around" className="lists">
                        <Col xs={11}>
                            <Checkbox key={index} onChange={() => onChange(li?.id, li?.status)} checked={li?.status === 1 ? true : false}>
                                {li?.content}
                            </Checkbox>
                        </Col>
                        <Col xs={5}>
                            <Button type="primary" onClick={() => handleDelete(li?.id)} danger>Delete</Button>
                        </Col>
                    </Row>
                )
            })}
        </PrivateLayout>
    )
}

export default List
