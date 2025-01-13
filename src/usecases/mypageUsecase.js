import * as repository from '../repositories/mypageRepository'

// 회원 정보 조회
export const getUserInfoUseCase = async (authorization) => (await repository.getUserInfo(authorization))

// 회원 정보 수정
export const patchUserInfoUseCase = async (headers, type, value) => {
    return await repository.patchUserInfo(headers, type, value);
  };