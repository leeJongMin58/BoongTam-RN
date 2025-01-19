import * as service from '../services/authService'

export async function login(authcode) {
    try {
        const response = await service.login({code : authcode})
        return response.code
    } catch (error) {
        console.log(error)
    }
}

export async function signup(code, nickname, email, address1, address2) {
	try {
		const response = service.signup({code, nickname, email, address1, address2})
        return response.data
	} catch (error) {
        console.log(error)
    }
}

export async function quit() {
	try {
		const response = service.quit()
        return response.data
	} catch (error) {
        console.log(error)
    }
}

export async function isDuplicateNickname(nickname) {
    try {
        const response = service.isDuplicateNickname(nickname)
        return response.data.isDuplicateNickname
    } catch (error) {
        console.log(error)
    }
}