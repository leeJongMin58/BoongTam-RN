import { Client, ClientWT } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()
const clientWT = new ClientWT()

// 회원가입
export const signup = async (userInfo) =>
	await client.post(makeEndPoint('auth/sign'), userInfo)

// 로그인
export const login = async (loginInfo) =>
	await client.post(makeEndPoint('auth/'), loginInfo)

// 닉네임 중복 확인 API
export const isDuplicateID = async (id) => {
	const result = await client.post(makeEndPoint('auth/check-user-id'), id)
	return result
}

// ID 찾기

// PW 찾기

// 인증번호 전송
export const sendAuthCode = async (phoneInfo) =>
	await client.post(makeEndPoint('verification/send-code'), phoneInfo)

// 인증번호 검증
export const veryfyAuthCode = async (authInfo) =>
	await client.post('verification/verify-code', authInfo)
