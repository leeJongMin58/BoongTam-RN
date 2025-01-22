import * as repository from '../repositories/authRepository'

// 회원가입
export const signupUseCase = async (
	phone,
	id,
	password,
	address_1,
	address_2,
	zipcode,
	email,
) => await repository.signup(phone, id, password, address_1, address_2, zipcode, email)

// 로그인
export const loginUseCase = async (id, password) => {
	return await repository.login(id, password)
}

// 닉네임 중복확인
export async function isDuplicateIDUseCase(id) {
	const result = await repository.isDuplicateID(id)
	return result
}

// ID 찾기

// 비밀번호 찾기

// 인증번호 전송
export const sendAuthCodeUseCase = async (phone) =>
	await repository.sendAuthCode(phone)

// 인증번호 검증
export const verifyAuthCodeUseCase = async (code, phone) =>
	await repository.verifyAuthCode(code, phone)
