import { Button, Form, Layout, Typography } from "antd"
import { useState, useEffect } from "react"
import usePostListQuery from "../../hooks/usePostListQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ReactHtmlParser from 'react-html-parser';
import QueryString from "query-string";
import InputCommon from "../../common/InputCommon";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { POST, POST_DETAIL } from "../../config/path";
import { bindParams } from "../../config/function";

import './Post.css';

const Post = () => {
    const [page, setPage] = useState(1)
    const location = useLocation()
    const [form] = Form.useForm()
    const keywordDefault = QueryString?.parse(location?.search).keyword
    const [pageSize, setPageSize] = useState(5)
    const [keyword, setKeyword] = useState(keywordDefault ? keywordDefault : '')
    const history = useHistory()

    const {
        data: postList,
        isError,
        isFetching
    } = usePostListQuery([page, pageSize, keyword])

    const data = postList?.data?.data

    useEffect(() => {
        form.setFieldsValue({keyword: keywordDefault || '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, keywordDefault])

    const pushHistory = (params) => {
        history.push({
            pathname: POST,
            search: QueryString.stringify({ keyword, ...params})
        })
    }
    const onFinish = (value) => {
        if(value.keyword !== keyword){
            setKeyword(value.keyword || '')
            pushHistory({keyword : value.keyword, page: page, limit: pageSize})
        }
    }

    const handleDetail = (id) => {
        history.push(bindParams(POST_DETAIL, {id}))
    }

    const watchMore = () => {
        setPageSize(pageSize + 5)
    }
    
    if(isError) return <div>Something went wrong</div>

    return (
        <PrivateLayout>
            <Typography.Title level={2} className="post-search-content">Posts of Teacher</Typography.Title>
            <Form
                layout="horizontal"
                className="form-post"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="keyword"
                >
                    <InputCommon size="large" />
                </Form.Item>
                <Button 
                    size="large"
                    loading={isFetching}
                    icon={<SearchOutlined />}
                    className="btn btn-common layout-student-form-button"
                    htmlType="submit"
                />
            </Form>
            <Layout className="layout-post">
                {data?.map((da, index) => {
                    if(da?.permisson === 1){
                        return(
                            <div className="layout-post-content" key={index} onClick={() => handleDetail(da?.id)}>
                                <div className="layout-post-content-title">
                                    {da?.title}
                                </div>
                                <img src={da?.photo} alt="#"/>
                                <div className="layout-post-content-author">
                                    {da?.date} by {da?.teacher?.name}
                                </div>
                                <div className="layout-post-content-description">
                                    {ReactHtmlParser(da?.description)}
                                </div>
                            </div>
                        )
                    }
                })}
                { postList?.data?.total > pageSize ? (
                    <Button className="btn-watch-more" size="large" onClick={watchMore}>See more</Button>

                ): null}
            </Layout>
        </PrivateLayout>
    )
}

export default Post
