import React, { Component } from 'react'
import './icons/css/weather-icons.css'
import './css/weather.scss'
import clear from './images/clear.jpg'
import clouds from './images/clouds.jpg'
import rain from './images/rain.jpg'
import snow from './images/snow.jpg'
import Temperature from './partial/current'
import api from './api'
import Header from './partial/header'
import ForecastContainer from './partial/forecastContainer'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			height: '',
			city: 'Warsaw',
			current: '',
			forecast: '',
			type: 'celsius',
			days: [
				'niedziela',
				'poniedzialek',
				'wtorek',
				'sroda',
				'czwartek',
				'piatek',
				'sobota'
			]
		}
	}

	async componentDidMount() {
		this.setState({
			height: window.innerHeight
		})
		window.addEventListener('resize', () => {
			let fContainer = document.querySelector('.forecast-container')
			if (this.state.height > window.innerHeight) {
				fContainer.classList.add('hidden')
			} else if (this.state.height <= window.innerHeight) {
				fContainer.classList.remove('hidden')
			}
		})
		//get default warsaw
		if (this.state.city === 'Warsaw') {
			this.getData()
		}
	}
	//get your own city
	getData = async e => {
		if (e) e.preventDefault()
		const weather = (await api.weather(this.state.city)).data
		this.setState({
			current: {
				name: weather.name,
				weather: weather.weather,
				temperature: weather.main
			}
		})
		const forecast = (await api.forecast(this.state.city)).data
		this.setState({ forecast: forecast.list })
	}
	toCelsius = temp => {
		return this.state.type === 'celsius'
			? Math.floor(temp - 273.15)
			: Math.floor((temp * 9) / 5 - 459.67)
	}
	changeType = type => {
		this.setState({ type })
	}
	weatherSwitcher = weather => {
		switch (weather) {
			case 'Clear':
				return ['wi-day-sunny', `url(${clear})`]
			case 'Clouds':
				return ['wi-day-cloudy', `url(${clouds})`]
			case 'Rain':
				return ['wi-day-rain', `url(${rain})`]
			case 'Snow':
				return ['wi-day-showers', `url(${snow})`]
			default:
				return ['wi-day-sunny', `url(${clear})`]
		}
	}
	handleCity = e => {
		this.setState({ city: e.target.value })
	}
	render() {
		const { name, temperature, weather } = this.state.current
		const forecast = this.state.forecast
		return (
			<div
				className="main-container"
				style={{
					backgroundImage: weather
						? this.weatherSwitcher(weather[0].main)[1]
						: ''
				}}
			>
				<Header
					getData={this.getData}
					state={this.state}
					handleCity={this.handleCity}
				></Header>
				<div className="current">
					<p className="city">{name}</p>
					{temperature && (
						<Temperature
							temperature={temperature}
							toCelsius={this.toCelsius}
							changeType={this.changeType}
							type={this.state.type}
							weather={weather[0].main}
							iconSwitcher={this.weatherSwitcher}
						></Temperature>
					)}
				</div>
				<ForecastContainer
					forecast={forecast}
					days={this.state.days}
					iconSwitcher={this.weatherSwitcher}
					toCelsius={this.toCelsius}
				></ForecastContainer>
			</div>
		)
	}
}

export default App
