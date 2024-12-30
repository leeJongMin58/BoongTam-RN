import { Client } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()

export const loginKakao = async (authcode) => (await client.post(makeEndPoint('auth/'), authcode))