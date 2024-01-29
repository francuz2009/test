const API_URL = 'https://dummyjson.com/'

export async function getData(url, body = null, type = 'POST') {
  try {
    const params = {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      params.body = JSON.stringify(body)
    }

    const endpointURL = API_URL + url
    const response = await fetch(endpointURL, params)
    const resultData = {
      status: response.status,
      data: await response.json()
    }

    return resultData
  } catch (error) {
    console.error(`Request failed: ${error}`)
    return error
  }
}

