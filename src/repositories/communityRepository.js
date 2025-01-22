import * as service from '../services/communityService.js'

// 레포지토리에서 에러처리 및 데이터 받기
// 매장 등록하게
export async function submitStore(lat, lng, address, name, store_type, appearance_day, open_hour, close_hour, payment_method, is_order_online) {
    try {
      const response = await service.submitStore(lat, lng, address, name, store_type, appearance_day, open_hour, close_hour, payment_method, is_order_online);
      return response.data;
    } catch (error) {
      console.error('Error in submitStore:', error);
      throw error;
    }
  }
  
// 매장 리뷰 작성
export async function writeStoreReview(store_id, review_text, review_rating, review_photos) {
    try {
        const response = await service.writeStoreReview({ store_id, review_text, review_rating, review_photos })
        console.log('reposi:', response)
        return response
    } catch (error) {
        console.log('repo:', error)
    }
}

// 굿즈 리뷰 작성
export async function writeGoodsReview(goods_id, review_text, review_rating, review_photos) {
    try {
        const response = await service.writeGoodsReview({ goods_id, review_text, review_rating, review_photos })
        return response
    } catch (error) {
        console.log(error)
    }
}

// 매장 리뷰 가져오기
export async function fetchStoreReviews(sort, count) {
    try {
        const response = await service.fetchStoreReviews(sort, count)
        return response
    } catch (error) {
        console.log(error)
    }
}

// 매장 인기리뷰 가져오기
export async function fetchPopularStoreReviews(authorization) {
    try {
        const response = await service.fetchPopularStoreReviews(authorization)
        return response
    } catch (error) {
        console.log(error)
    }
}

// 굿즈 리뷰 가져오기
export async function fetchGoodsReviews(sort, count) {
    try {
        const response = await service.fetchGoodsReviews(sort, count)
        return response
    } catch (error) {
        console.log(error)
    }
}

// 굿즈 리뷰 가져오기
export async function storeReviewDetailInfo(sort, count) {
    try {
        const response = await service.storeReviewDetailInfo(sort, count)
        console.log('storeReviewDetailInfo reposi:', response)
        return response
    } catch (error) {
        console.log(error)
    }
}
