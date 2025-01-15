import * as service from '../services/communityService.js'

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
export async function writeGoodsReview(goods_id, review_text, review_photos) {
    try {
        const response = await service.writeGoodsReview({ goods_id, review_text, review_photos })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// // 매장 리뷰 가져오기
// export async function fetchStoreReviews(authorization) {
//     try {
//         const response = await service.fetchStoreReviews(authorization)
//         return response
//     } catch (error) {
//         console.log(error)
//     }
// }

// // 매장 인기리뷰 가져오기
// export async function fetchPopularStoreReviews(authorization) {
//     try {
//         const response = await service.fetchPopularStoreReviews(authorization)
//         return response
//     } catch (error) {
//         console.log(error)
//     }
// }

// 굿즈 리뷰 가져오기
export async function fetchGoodsReviews(authorization) {
    try {
        const response = await service.fetchGoodsReviews(authorization)
        return response
    } catch (error) {
        console.log(error)
    }
}

// 굿즈 리뷰 가져오기
export async function reviewLikeToggle(authorization) {
    try {
        const response = await service.reviewLikeToggle(authorization)
        console.log('reposi:', response)
        return response
    } catch (error) {
        console.log(error)
    }
}
