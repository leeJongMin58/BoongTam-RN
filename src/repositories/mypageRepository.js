import * as service from '../services/mypageService'


// 회원 정보 조회
export async function getUserInfo(authorization) {
    try {
        // const userInfo = {user_id:1111, nickname:'rr', profile_picture:'dd', points:10}
        const response = await service.getUserInfo(authorization);
        console.log('Repository', response); // 선언 후 로그 출력
        return response.data;
    } catch (error) {
        console.log('repository', error);
    }
}

// 회원 정보 수정
export async function patchUserInfo(headers, type, value) {
    try {
      const response = await service.patchUserInfo(headers, type, value);
      console.log("Repository Response:", response);
      return response.data;
    } catch (error) {
      console.error("Repository Error:", error);
      throw error;
    }
  }