import * as repository from '../repositories/authRepository'

export const loginUseCase = async (authcode) => {
    return await repository.login(authcode)
}

export const signupUseCase = async(code, nickname, email, address1, address2) => (await repository.signup(code, nickname, email, address1, address2))

export const quitUseCase = async () => (await repository.quit())

export const isDuplicateNickname = async (nickname) => (await repository.isDuplicateNickname(nickname))