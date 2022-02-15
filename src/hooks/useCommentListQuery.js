import axios from "axios"
import QueryString from "qs"
import { useQuery } from "react-query"
import { API_COMMENT } from "../config/endpointApi"

const getCommentList = ({ queryKey }) => {
    const [_, page, limit, id] = queryKey
    const params = { page, limit, id_post: id}

    return axios.get(API_COMMENT, {params, paramsSerializer: (params) => {
        return QueryString.stringify(params)
    },})
}

function useCommentListQuery(params){
    return useQuery(['comment', ...params], getCommentList, {
        refetchOnWindowFocus: false,
        staleTime: 500000
    })
}

export default useCommentListQuery