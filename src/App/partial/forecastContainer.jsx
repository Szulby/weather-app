import React from 'react'

export default function ForecastContainer({
	forecast,
	days,
	iconSwitcher,
	toCelsius
}) {
	let position = ''
	let before = ''
	let folow = false
	let fContainer = document.querySelector('.forecast-container')
	function scroll(e) {
		if (folow) {
			if (!position) {
				position = e.clientX
			}
			if (!before) {
				before = fContainer.scrollLeft
			}
			fContainer.scrollLeft = before + position - e.clientX
		}
	}
	function mouseUp() {
		before = ''
		position = ''
		folow = false
	}
	return (
		<div
			className="forecast-container"
			onMouseMove={scroll}
			onMouseDown={() => (folow = true)}
			onMouseUp={mouseUp}
		>
			{forecast &&
				forecast.map((item, id) => {
					return (
						<div key={id} className="forecast-block">
							<p>
								{days[new Date(item.dt_txt).getDay()]}
								{item.dt_txt.slice(11, -3)}
							</p>
							<i className={`wi ${iconSwitcher(item.weather[0].main)[0]}`}></i>
							<p className="forecast-temp">{toCelsius(item.main.temp)}</p>
							<p className="forecast-weather">{item.weather[0].main}</p>
						</div>
					)
				})}
		</div>
	)
}
