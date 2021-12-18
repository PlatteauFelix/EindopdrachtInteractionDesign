// global variables
var myChart;
var start_round = 1;
var total_rounds = 25;
var toggle_checked = false;



// 3 Met de data van de API kunnen we de app opvullen
function showChartDrivers(data) {
	var drivers = [];
	// console.log(data)


	// get drivers list
	data.forEach(race => {
		// console.log(race)
		array = race.DriverStandings
		array.forEach(driver => {
			drivers.push(driver.Driver)
		});
	});
	// make list unique and add to columns
	drivers = _.uniqWith(drivers, _.isEqual)
	// console.log(drivers)

	var lines = []

	drivers.forEach(driver => {
		var points = [];
		var color = "deeppink";
		data.forEach(race => {
			race.DriverStandings.forEach(standing => {
				if (_.isEqual(driver, standing.Driver)) {
					points.push(standing.points)

					switch (standing.Constructors[0].constructorId) {
						case "red_bull":
							color = "#0600ef";
							break;
						case "mercedes":
							color = "#00d2be";
							break;
						case "mclaren":
							color = "#ff9800";
							break;
						case "ferrari":
							color = "#dc0000";
							break;
						case "alphatauri":
							color = "#2b4562";
							break;
						case "alpine":
							color = "#0090ff";
							break;
						case "aston_martin":
							color = "#006f62";
							break;
						case "williams":
							color = "#005aff";
							break;
						case "alfa":
							color = "#900000";
							break;
						case "haas":
							color = "white";
							break;
						default:
							break;
					}
				}
			});
		});

		var line = {
			label: driver.givenName + " " + driver.familyName,
			data: points,
			fill: false,
			borderColor: color,
		};

		lines = _.concat(lines, line)

		// console.log(points)
	});

	const chartLabels = [];
	data.forEach(race => {
		chartLabels.push(race.round)
	})

	const chartData = {
		labels: chartLabels,
		datasets: lines
	};

	const config = {
		type: 'line',
		data: chartData,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: 'Race round',
						color: 'black',
						font: {
							size: 16,
							weight: 'normal',
							lineHeight: 1.2,
						},
						padding: { top: 16, left: 0, right: 0, bottom: 16 }
					}
				},
				y: {
					display: true,
					title: {
						display: true,
						text: 'Points',
						color: 'black',
						font: {
							size: 16,
							style: 'normal',
							lineHeight: 1.2
						},
						padding: { top: 0, left: 0, right: 0, bottom: 0 }
					}
				}
			},
			plugins: {
				legend: {
					position: 'bottom',
					align: "center",
					labels: {
						usePointStyle: true,
						boxWidth: 6
					}
				},
				zoom: {
					zoom: {
						wheel: {
							enabled: true,
						},
						pinch: {
							enabled: true
						},
						mode: 'y'
					}
				}
			}
		}
	};

	myChart = new Chart(document.getElementById('myChart'), config);
}
function showChartConstructors(data) {
	var constructors = [];
	// console.log(data)


	// get drivers list
	data.forEach(race => {
		// console.log(race)
		array = race.ConstructorStandings
		array.forEach(constructor => {
			constructors.push(constructor.Constructor)
		});
	});
	// make list unique and add to columns
	constructors = _.uniqWith(constructors, _.isEqual)
	// console.log(constructors)

	var lines = []

	constructors.forEach(constructor => {
		var points = [];
		var color = "deeppink";
		data.forEach(race => {
			race.ConstructorStandings.forEach(standing => {
				if (_.isEqual(constructor, standing.Constructor)) {
					points.push(standing.points)

					switch (standing.Constructor.constructorId) {
						case "red_bull":
							color = "#0600ef";
							break;
						case "mercedes":
							color = "#00d2be";
							break;
						case "mclaren":
							color = "#ff9800";
							break;
						case "ferrari":
							color = "#dc0000";
							break;
						case "alphatauri":
							color = "#2b4562";
							break;
						case "alpine":
							color = "#0090ff";
							break;
						case "aston_martin":
							color = "#006f62";
							break;
						case "williams":
							color = "#005aff";
							break;
						case "alfa":
							color = "#900000";
							break;
						case "haas":
							color = "white";
							break;
						default:
							break;
					}
				}
			});
		});

		var line = {
			label: constructor.name,
			data: points,
			fill: false,
			borderColor: color,
		};

		lines = _.concat(lines, line)

		// console.log(points)
	});

	const chartLabels = [];
	data.forEach(race => {
		chartLabels.push(race.round)
	})

	const chartData = {
		labels: chartLabels,
		datasets: lines
	};

	const config = {
		type: 'line',
		data: chartData,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: 'Race round',
						color: 'black',
						font: {
							size: 16,
							weight: 'normal',
							lineHeight: 1.2,
						},
						padding: { top: 16, left: 0, right: 0, bottom: 16 }
					}
				},
				y: {
					display: true,
					title: {
						display: true,
						text: 'Points',
						color: 'black',
						font: {
							size: 16,
							style: 'normal',
							lineHeight: 1.2
						},
						padding: { top: 0, left: 0, right: 0, bottom: 0 }
					}
				}
			},
			plugins: {
				legend: {
					position: 'bottom',
					align: "center",
					labels: {
						usePointStyle: true,
						boxWidth: 6
					}
				},
				zoom: {
					zoom: {
						wheel: {
							enabled: true,
						},
						pinch: {
							enabled: true
						},
						mode: 'y'
					}
				}
			}
		}
	};

	myChart = new Chart(document.getElementById('myChart'), config);
}



// 2 we halen de f1 driver standings API op.
let getDataDrivers = async (min, max) => {
	var result = [];

	for (let i = min; i < max + 1; i++) {
		const ENDPOINT = `https://ergast.com/api/f1/2021/${i}/driverStandings.json`;
		const request = await fetch(`${ENDPOINT}`);
		const json = await request.json();
		const data = json["MRData"]["StandingsTable"]["StandingsLists"][0]
		if (data != null) {
			result.push(data)
		}
		else {
			total_rounds = i;
			break
		}
	}
	showChartDrivers(result);
};
let getDataConstructors = async (min, max) => {
	var result = [];

	for (let i = min; i < max + 1; i++) {
		const ENDPOINT = `https://ergast.com/api/f1/2021/${i}/constructorStandings.json`;
		const request = await fetch(`${ENDPOINT}`);
		const json = await request.json();
		const data = json["MRData"]["StandingsTable"]["StandingsLists"][0]
		if (data != null) {
			result.push(data)
		}
		else {
			total_rounds = i;
			break
		}
	}
	showChartConstructors(result);
};

const listenToSwitcher = function () {
	for (const interval of document.querySelectorAll('.js-switcher')) {
		interval.addEventListener('click', function () {
			myChart.destroy();
			// console.log(interval.getAttribute("data-type") + interval.getAttribute("data-value"))
			if (interval.getAttribute("data-type") == "all") {
				if(toggle_checked==false){
					getDataDrivers(start_round, total_rounds)
				}
				else{
					getDataConstructors(start_round, total_rounds)
				}
			}
			if (interval.getAttribute("data-type") == "first") {
				if(toggle_checked==false){
					getDataDrivers(start_round, parseInt(interval.getAttribute("data-value")))
				}
				else{
					getDataConstructors(start_round, parseInt(interval.getAttribute("data-value")))
				}
			}
			if (interval.getAttribute("data-type") == "last") {
				if(toggle_checked==false){
					getDataDrivers(total_rounds-interval.getAttribute("data-value"), total_rounds)
				}
				else{
					getDataConstructors(total_rounds-interval.getAttribute("data-value"), total_rounds)
				}
			}
		})
		interval.removeEventListener('click', null, false)
	}
};

const listenToToggle = function () {
	var toggle = document.querySelector('.js-toggle')
	toggle.addEventListener('click', function () {
		myChart.destroy()
		if (toggle.checked == true) {
			// console.log('toggle checked')
			toggle_checked = true;
			for (const interval of document.querySelectorAll('.js-switcher')) {
				if (interval.getAttribute("data-type") == "all") {
					// console.log('reset to all')
					interval.checked = true;
					document.querySelector('.js-title').innerHTML = "F1 constructor standings 2021"
					getDataConstructors(start_round, total_rounds);
				}
			}
		}
		else {
			// console.log('toggle unchecked')
			toggle_checked = false;
			for (const interval of document.querySelectorAll('.js-switcher')) {
				if (interval.getAttribute("data-type") == "all") {
					// console.log('reset to all')
					interval.checked = true;
					document.querySelector('.js-title').innerHTML = "F1 driver standings 2021"
					getDataDrivers(start_round, total_rounds);
				}
			}
		}
	})
}


// wait for DOM content loaded before we get the data and add listeners
document.addEventListener('DOMContentLoaded', function () {
	getDataDrivers(start_round, total_rounds);
	listenToSwitcher();
	listenToToggle();
});
