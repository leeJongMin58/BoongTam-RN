import * as service from '../services/authService'

export async function loginKakao(authcode) {
    try {
        const response = await service.loginKakao({code : authcode})
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`kakao login error: ${error}`)
    }
}