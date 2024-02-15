import { getLocalStorageData } from "../utils/localstorage"
import { axiosInstance } from "./fetcher"

export const createComment= async (url:string, {arg}:{arg:{comment:string}})=>{
    
    const token:string=await getLocalStorageData("token") as string
                 console.log(arg.comment)
    await axiosInstance.post(url, {comment:arg.comment}, 
        { headers: { 'jwt_token': token } })
}