import { Client, ClientWT } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()
const clientWT = new ClientWT()

export const login = async (authcode) => await client.post(makeEndPoint('auth/'), authcode)

export const signup = async (userInfo) =>
	await client.post(makeEndPoint('auth/sign'), userInfo)

export const quit = async () => await clientWT.delete(makeEndPoint('auth/'))

export const isDuplicateNickname = async () =>
	await client.post(makeEndPoint('auth/', { nickname }))
