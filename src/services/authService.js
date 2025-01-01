import { Client } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()

export const login = async (authcode) => (await client.post(makeEndPoint('auth/'), authcode))
export const signup = async (userInfo) => (await client.post(makeEndPoint('auth/sign'), userInfo))
export const quit = async () => (await client.delete(makeEndPoint('auth/')))