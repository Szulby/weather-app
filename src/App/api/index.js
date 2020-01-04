import axios from 'axios'
class api {
	constructor(baseUrl, apiKey) {
		this.baseUrl = baseUrl
		this.apiKey = apiKey
	}
	weather = function(param) {
		return axios.get(`${this.baseUrl}weather?q=${param}${this.apiKey}`)
	}
	forecast = function(param) {
		return axios.get(`${this.baseUrl}forecast?q=${param}${this.apiKey}`)
	}
}

export default new api(process.env.REACT_APP_URL, process.env.REACT_APP_KEY)
