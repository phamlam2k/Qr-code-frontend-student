import { useParams } from "react-router-dom"
import usePostDetailQuery from "../../hooks/usePostDetailQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";

import './PostDetail.css';
import { Button, Form, notification } from "antd";
import InputCommon from "../../common/InputCommon";
import axios from "axios";
import { API_COMMENT } from "../../config/endpointApi";
import useCommentListQuery from "../../hooks/useCommentListQuery";
import { useState } from "react";
import { useQueryClient } from "react-query";

const PostDetail = () => {
    const {id} = useParams()
    const [form] = Form.useForm()
    const photo = JSON.parse(localStorage.getItem('user_info')).photo
    const id_student = JSON.parse(localStorage.getItem('user_info')).id_student
    const [page] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const queryClient = useQueryClient()
    
    const {
        data: postDetail,
        isError,
    } = usePostDetailQuery(id)

    const {
        data: comment,
    } = useCommentListQuery([page, pageSize, id])

    const data_comment = comment?.data?.data?.data

    const data = postDetail?.data

    const watchMore = () => {
        setPageSize(pageSize + 5)
    }
    
    const onFinish = (value) => {
        value.id_post = id
        value.student = id_student
        value.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        value.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")

        axios.post(API_COMMENT, value)
            .then((res) => {
                if(res?.data?.code === 200){
                    notification.success({
                        message: res.data.message
                    })
                    form.setFieldsValue({comment: ''})
                    queryClient.invalidateQueries(['comment'])
                }
            })
    }

    if(isError) return <div>Something went wrong</div> 

    return (
        <PrivateLayout>
            <div className="layout-post-detail">
                <div className="layout-post-detail-title">
                    {data?.title}
                </div>
                <img src={data?.photo} alt="#"/>
                <div className="layout-post-detail-description">
                    {ReactHtmlParser(data?.description)}
                </div>
                <div className="layout-post-detail-author">
                    {data?.date} by {data?.teacher?.name}
                </div>
                <div className="layout-comment-user">
                    <div className="layout-comment-user-avatar">
                        <img src={photo} alt="#"/>
                    </div>
                    <Form
                        layout="horizontal"
                        className="form-post-detail"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="comment"
                        >
                            <InputCommon size="large" placeholder="Comment"/>
                        </Form.Item>
                        <Button
                            size="large"
                            className="btn btn-common layout-student-form-button"
                            htmlType="submit"
                        >Send</Button>
                    </Form>
                </div>
                <div className="layout-comment-number">
                    <div></div>
                    <div className="layout-comment-number-cm">{comment?.data?.data?.total} comments</div>
                </div>
                <div className="layout-comment-users">
                    {data_comment?.map((da, index) => {
                        return (
                            <div className="layout-comment-users-content-parent" key={index}>
                                <div className="layout-comment-users-content">
                                    <img src={da?.student?.photo} alt="#" />
                                    <div className="layout-comment-users-content-cm">
                                        <div className="layout-comment-users-content-cm-abs">
                                        </div>
                                        <div className="layout-comment-users-content-cm-name">
                                            {da?.student?.name}
                                        </div>
                                        {da?.comment}
                                    </div>
                                </div>
                                <div className="layout-comment-users-content-2">
                                    {moment(da?.date).fromNow(true)} ago
                                </div>
                            </div>
                        )
                    })}
                </div>
                { comment?.data?.data?.total > pageSize ? (
                    <Button className="btn-watch-more-comment" onClick={watchMore}>See more</Button>

                ): null}
            </div>
        </PrivateLayout>
    )
}

export default PostDetail
