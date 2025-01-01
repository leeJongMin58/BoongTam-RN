// 임시로 URL 두겠습니다. 서버가 aws랑 연결하면 그때 .env파일 이용해서 BASE_URL 관리하겠습니다.
// const BASE_URL = 'http://192.168.162.10:8080/'
const BASE_URL = 'http://localhost:8080/'

// 토큰이 필요없는 통신
class Client {
	async get(endpoint, requestBody) {
		return await fetchData(false, 'GET', endpoint, requestBody)
	}

	async post(endpoint, requestBody) {
		return await fetchData(false, 'POST', endpoint, requestBody)
	}

	async put(endpoint, requestBody) {
		return await fetchData(false, 'PUT', endpoint, requestBody)
	}

	async patch(endpoint, requestBody) {
		return await fetchData(false, 'PATCH', endpoint, requestBody)
	}

	async delete(endpoint, requestBody) {
		return await fetchData(false, 'DELETE', endpoint, requestBody)
	}
}

// 토큰이 필요한 통신 Client With Token
class ClientWT {
	async get(endpoint, requestBody) {
		return await fetchData('GET', endpoint, requestBody)
	}

	async post(endpoint, requestBody) {
		return await fetchData('POST', endpoint, requestBody)
	}

	async put(endpoint, requestBody) {
		return await fetchData('PUT', endpoint, requestBody)
	}

	async patch(endpoint, requestBody) {
		return await fetchData('PATCH', endpoint, requestBody)
	}

	async delete(endpoint, requestBody) {
		return await fetchData('DELETE', endpoint, requestBody)
	}
}

async function fetchData(requireToken, method, endpoint, requestBody) {
	try {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// 토큰 생성 코드 완성되면 테스트 필요
		// if (requireToken) {
		// 	const token =
		// 		localStorage.getItem('token') || sessionStorage.getItem('token')
		// 	if (token) {
		// 		options.headers['Authorization'] = `Bearer ${token}`
		// 	} else {
		// 		throw new Error('No token found')
		// 	}
		// }

		if (requestBody) {
			options.body = JSON.stringify(requestBody)
		}
		const resp = await fetch(BASE_URL + endpoint, options)

		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`)
		}

		const data = await resp.json()
		return data
	} catch (error) {
		console.error('Error:', error)
	}
}

export { Client }
