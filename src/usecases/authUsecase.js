import * as repository from '../repositories/authRepository'

export const loginUseCase = async (authcode) => (await repository.loginKakao(authcode))

export const signupUseCase = async(code, nickname, email, address1, address2) => (await repository.signup(code, nickname, email, address1, address2))

export const quitUseCase = async () => (repository.quit())