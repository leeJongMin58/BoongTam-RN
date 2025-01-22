const BASE_URL = 'http://3.39.104.44:80/'

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
		return await fetchData(true, 'GET', endpoint, requestBody)
	}

	async post(endpoint, requestBody) {
		return await fetchData(true, 'POST', endpoint, requestBody);
	}

	async put(endpoint, requestBody) {
		return await fetchData(true, 'PUT', endpoint, requestBody)
	}

	async patch(endpoint, requestBody) {

		return await fetchData(true, 'PATCH', endpoint, requestBody)
	}

	async delete(endpoint, requestBody) {
		return await fetchData(true, 'DELETE', endpoint, requestBody)
	}
}

async function fetchData(requireToken, method, endpoint, requestBody) {
	try {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json',
				authorization: 'CHIHO3333',
			},
		}

		if (requestBody) {
			options.body = JSON.stringify(requestBody)
		}
		const resp = await fetch(BASE_URL + endpoint, options)
		console.log('client1', resp)

		if (!resp.ok) {
			throw new Error(`Client error! status: ${resp.status}`)
		}

		const data = await resp.json()
		console.log('client2', data)
		return data
	} catch (error) { 
		console.error('client Error:', error)
		throw error;
	}
}

export { Client, ClientWT }
