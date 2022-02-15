import axios from "axios"
import { useMutation } from "react-query"
import { API_LIST } from "../config/endpointApi"
import { bindParams } from "../config/function"

const getList = (params) => {
    const {id, status} = params
    return axios.put(bindParams(API_LIST, {id}), {status})
}

export default function useListMutaion(){
    return useMutation(getList)
}