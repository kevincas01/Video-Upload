import axios from "axios";
import { getLocalStorageData } from "../utils/localstorage";

export const axiosInstance=axios.create({
    baseURL:"http://localhost:3005"
});

const fetcher = async (url: string) => {
    try {
      const token = await getLocalStorageData('token') as string;
      const response = await axiosInstance.get(url, { headers: { 'jwt_token': token } });
      console.log(response)
      return response.data.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export default fetcher;
