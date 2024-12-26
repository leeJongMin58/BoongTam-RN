import { Client } from '../api/httpClient'
import { makeEndPoint } from '../utils/MakeEndtryPoint'

const client = new Client()

export const getTestApi = async (params, requestBody) => (
    await client.get(makeEndPoint('api/boongs', params), requestBody))
