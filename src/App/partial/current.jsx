import React from 'react'

const Temperature = ({
	temperature,
	toCelsius,
	changeType,
	type,
	weather,
	iconSwitcher
}) => {
	return (
		<div>
			<div className="temperature-block">
				<i className={`wi ${iconSwitcher(weather)[0]}`}></i>

				<p className="main-temperature">{toCelsius(temperature.temp)}</p>
				<div className="btns-block">
					<button
						className={`btn ${type === 'farenheit' ? 'active' : ''}`}
						onClick={() => changeType('farenheit')}
					>
						F
					</button>
					<button
						className={`btn second ${type === 'celsius' ? 'active' : ''}`}
						onClick={() => changeType('celsius')}
					>
						C
					</button>
				</div>
			</div>
			<p className="weather">{weather}</p>
			<p className="temperature">
				<i className="wi wi-direction-up"></i>
				{toCelsius(temperature.temp_max)}
			</p>
			<p className="temperature">
				<i className="wi wi-direction-down"></i>
				{toCelsius(temperature.temp_min)}
			</p>
		</div>
	)
}
export default Temperature
