import * as service from '../services/testServices'

export async function getTestApi() {
    try {
        const response = await service.getTestApi()
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
    }
}