import { Button, Form, Modal, notification } from "antd"
import axios from "axios"
import moment from "moment"
import { useQueryClient } from "react-query"
import InputCommon from "../../common/InputCommon"
import { API_LISTS } from "../../config/endpointApi"

import "./List.css"

const ListModal = ({isModalVisible, handleCancel, id }) => {
    const queryClient = useQueryClient()

    const onSubmit = (value) => {
        value.user_id = id
        value.status = 0
        value.create_date = moment().format("YYYY-MM-DD")

        axios.post(API_LISTS, value)
            .then((res) => {
                if(res?.data?.code === 200){
                    notification.success({
                        message: res?.data?.message
                    })
                    queryClient.invalidateQueries(["list"])
                    handleCancel()
                }else{
                    notification.error({
                        message: res?.data?.message
                    })
                }
            })
    }

    return (
        <Modal visible={isModalVisible} footer={null}>
            <Form
             className="list-modal"
             onFinish={onSubmit}
            >
                <Form.Item name="contents" label="What do you want to do today ?">
                    <InputCommon />
                </Form.Item>
                <div className="list-modal-btn">
                    <Button htmlType="submit" className="list-modal-btn">
                        Add
                    </Button>
                    <Button htmlType="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default ListModal
