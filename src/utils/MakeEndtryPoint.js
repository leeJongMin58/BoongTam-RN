export function makeEndPoint(endpoint, params = {}, query = {}) {
	// 1. params로 전달된 값이 있으면 endpoint에 값을 삽입
	Object.keys(params).forEach((key) => {
		const value = params[key]
		endpoint = endpoint.replace(`{${key}}`, value) // {key}를 실제 값으로 치환
	})

	// 2. query 객체가 있으면 쿼리 문자열을 생성하여 붙임
	const queryString = new URLSearchParams(query).toString()
	if (queryString) {
		endpoint += `?${queryString}` // 쿼리 파라미터가 있으면 ?로 구분하여 추가
	}

	return endpoint // 최종 URL 반환
}
