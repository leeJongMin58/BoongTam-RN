import * as service from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 회원가입
export async function signup(phone, id, password, address_1, address_2, zipcode, email) {
	try {
		const userInfo = { phone, id, password, address_1, address_2, zipcode, email}
		console.log('user ', userInfo)
		const response = service.signup(userInfo)
		console.log(response)

		await AsyncStorage.setItem('token', JSON.stringify('test'))
		return response
	} catch (error) {
		console.log(error)
	}
}

// 로그인
export async function login(id, password) {
	try {
		const loginInfo = { id, password }
		const response = await service.login(loginInfo)
		if (response.code == 200) {
			await AsyncStorage.setItem('token', JSON.stringify(response.token))
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 닉네임 중복확인
export async function isDuplicateID(id) {
	try {
		const response = await service.isDuplicateID({ id })
		console.log(response)

		return { code: response.code }
	} catch (error) {
		console.error('Error checking duplicate ID:', error)
		return { code: 500 } // 서버 에러 처리
	}
}

// ID 찾기

// PW 찾기

// 인증번호 전송
export async function sendAuthCode(phone) {
	try {
		const response = service.sendAuthCode({ phone })
		console.log(response)
	} catch (error) {
		console.log(error)
	}
}

// 인증번호 검증
export async function verifyAuthCode(code, phone) {
	try {
		const response = service.veryfyAuthCode({ code, phone })
		return response
	} catch (error) {
		console.log(error)
	}
}
