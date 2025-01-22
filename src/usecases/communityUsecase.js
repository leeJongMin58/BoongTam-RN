import * as repository from '../repositories/communityRepository.js'

// 매장 제보하기
export const submitStore = async (storeInfo) => 
    (await repository.submitStore(storeInfo))
  
// 매장 리뷰 작성
export const writeStoreReview = async (store_id, review_text, review_rating, review_photos) => 
    (await repository.writeStoreReview(store_id, review_text, review_rating, review_photos))

// 굿즈 리뷰 작성
export const writeGoodsReview = async (goods_id, review_text, review_rating, review_photos) => 
    (await repository.writeGoodsReview(goods_id, review_text, review_rating, review_photos))

// 매장 리뷰 가져오기
export const fetchStoreReviews = async (sort, count) => 
    await repository.fetchStoreReviews(sort, count)

// 매장 인기리뷰 가져오기
export const fetchPopularStoreReviews = async (authorization) => 
    await repository.fetchPopularStoreReviews(authorization)

// 굿즈 리뷰 가져오기
export const fetchGoodsReviews = async (sort, count) => 
    await repository.fetchGoodsReviews(sort, count)

// 리뷰 상세정보
export const storeReviewDetailInfo = async (sort, count) => 
    await repository.storeReviewDetailInfo(sort, count)