import React from 'react'
import App from '../index'
import { shallow, mount } from 'enzyme'
import api from '../api'
describe('test aplication', () => {
	it('axios', async () => {
		const weather = (await api.weather('warsaw')).data
		const app = mount(<App></App>)
		app.setState({
			current: {
				name: weather.name,
				weather: weather.weather,
				temperature: weather.main
			}
		})
		const forecast = (await api.forecast('warsaw')).data
		app.setState({ forecast: forecast.list })
		expect(app.find('.city').text()).toBe('Warsaw')
	})
})
