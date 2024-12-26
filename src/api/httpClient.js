const BASE_URL = 'http://192.168.162.10:3000/'

class Client {
	async get(endpoint, requestBody) {
		return await fetchData('GET', endpoint, requestBody)
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

async function fetchData(method, endpoint, requestBody) {
	try {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
		}

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
