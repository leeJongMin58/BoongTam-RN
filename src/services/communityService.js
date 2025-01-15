import { ClientWT, Client } from '../api/httpClient';
import { makeEndPoint } from '../utils/MakeEndtryPoint';

const client = new Client()
const clientWT = new ClientWT();

// 매장 등록하기
export const submitStore = async (storeInfo) => {
  try {
    console.log('Store Info Sent:', storeInfo); // 디버깅용 로그
    const endpoint = makeEndPoint('community/store');
    console.log('Endpoint:', endpoint); // 디버깅용 로그
    const response = await clientWT.post(endpoint, storeInfo);
    console.log('Response:', response); // 서버 응답 확인
    return response;
  } catch (error) {
    console.error('Error in 서비스:', error);
    throw error;
  }
};

// 매장 리뷰 리스트
export const storeReview = async (storeInfo) =>
  await client.get(makeEndPoint('community/sre', storeInfo))


// 매장 리뷰 작성하기
export const writeStoreReview = async (store_id, review_text, review_rating, review_photos) => {
  try {
    const endpoint = makeEndPoint('community/store/review')
    const response = await clientWT.post(endpoint, store_id, review_text, review_rating, review_photos)
    console.log('service resp:', response)
    return response
  } catch (error) {
    console.error('Error in service:', error);
    throw error;
  }
};

// 굿즈 리뷰 작성하기
export const writeGoodsReview = async (goods_id, review_text, review_photos) => {
  try {
    const endpoint = makeEndPoint('community/goods/review')
    const response = await clientWT.post(endpoint, goods_id, review_text, review_photos)
    console.log('service resp:', response)
    return response
  } catch (error) {
    console.error('Error in service:', error);
    throw error;
  }
};

// 매장 리뷰 가져오기
export const fetchStoreReviews = async (sort, count) => {
  try {
    const endpoint = makeEndPoint('community/sre', {}, { sort, count });
    const response = await clientWT.get(endpoint);
    
    return response; // 필요한 데이터만 반환
  } catch (error) {
    console.error('Error fetching store reviews:', error);
    throw error;
  }
};

// 리뷰(인기순) 가져오기
export const fetchPopularStoreReviews = async (sort = 'popular', count) => {
  try {
    const endpoint = makeEndPoint('community/sre', {}, { sort, count });
    const response = await clientWT.get(endpoint);
    return response; // 필요한 데이터만 반환
  } catch (error) {
    console.error('Error fetching popular reviews:', error);
    throw error;
  }
};

// 굿즈 리뷰 가져오기
export const fetchGoodsReviews = async (sort, count) => {
  try {
    const endpoint = makeEndPoint('community/gre', {}, { sort, count });
    const response = await clientWT.get(endpoint);
    return response; // 필요한 데이터만 반환
  } catch (error) {
    console.error('Error fetching goods reviews:', error);
    throw error;
  }
};

// 리뷰 좋아요 토글
export const reviewLikeToggle = async (review_type, review_id, like) => {
  try {
    const endpoint = makeEndPoint('community/re/like', {}, { review_type, review_id, like });
    const response = await clientWT.patch(endpoint);
    console.log('service:', response)
    return response; // 필요한 데이터만 반환
  } catch (error) {
    console.error('Error fetching reviewLikeToggle:', error);
    throw error;
  }
};

// // 매장  상세정보
// export const storeDetailInfo = async (sort, count) => {
//   try {
//     const endpoint = makeEndPoint(`boong/store/${store_id}`, {store_id}, { tab, sort, count });
//     const response = await clientWT.get(endpoint);
//     return response; // 필요한 데이터만 반환
//   } catch (error) {
//     console.error('Error fetching goods reviews:', error);
//     throw error;
//   }
// };