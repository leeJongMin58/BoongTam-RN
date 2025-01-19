import { Client, ClientWT } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()
const clientWT = new ClientWT()

// 회원 정보 조회 
// export const getUserInfo = async(authorization) => {
//     console.log('============')
//     console.log('mypage', makeEndPoint('/user/info'), authorization)
//     return await clientWT.get(makeEndPoint('/user/info'), authorization)
// }
export const getUserInfo = async (authorization) => {
    try {
        const endpoint = makeEndPoint('user/info')
        console.log('makeEndpoint', endpoint)
        const response = await clientWT.get(endpoint, authorization)
        console.log('service resp:', response)
        return response
    } catch (error) {
        console.error('Error in service:', error);
        throw error;
    }
};


// 회원 정보 수정
export const patchUserInfo = async (headers, type, value) => {
    try {
      const endpoint = makeEndPoint('user/info');
      const requestBody = { type, value }; // API 명세에 따른 요청 바디
      console.log('Request Body:', requestBody);
  
      const response = await clientWT.patch(endpoint, requestBody, headers);
      console.log('Service Response:', response);
  
      return response;
    } catch (error) {
      console.error('Error in service:', error);
      throw error;
    }
  };