import axios from "axios"
import { useQuery } from "react-query"
import { API_LIST } from "../config/endpointApi"
import { bindParams } from "../config/function"

const getList = async (id) => {
    const { data } = await axios.get(bindParams(API_LIST, {id}))

    return data
}

export default function useListQuery(id){
    return useQuery(['list', id], () => getList(id), {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 18000000
    })
}