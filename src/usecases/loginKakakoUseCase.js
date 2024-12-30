import * as repository from '../repositories/authRepository'

export const loginKakaoUseCase = async (authcode) => (await repository.loginKakao(authcode))
