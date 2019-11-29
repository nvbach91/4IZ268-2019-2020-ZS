// 1
const todaysDate = new Date().getFullYear();
const person = {
	birthDate: '1997',
	name: 'Pepe'
};

function calculateAge(person) {
	var result = 'Age of ' + person.name + ' is ' + (todaysDate - person.birthDate);
	console.log(result);
}

calculateAge(person);

// 2
const tCelsius = 30;
const tFahrenheiht = 86;

function calcuteTemperature(tCelsius, tFahrenheiht) {
	var resultFahrenheiht = tCelsius * 9 / 5 + 32;
	var resultCelsius = (tFahrenheiht - 32) * 5 / 9;
	console.log(tCelsius + '°C' + ' = ' + resultFahrenheiht + '°F');
	console.log(tFahrenheiht + '°F' + ' = ' + resultCelsius + '°C');
}

calcuteTemperature(tCelsius, tFahrenheiht);

// 3
function calculateCelsius(tFahrenheiht) {
	var resultCelsius = (tFahrenheiht - 32) * 5 / 9;
	console.log(tFahrenheiht + '°F' + ' = ' + resultCelsius + '°C');
}

function calculateFahrenheiht(tCelsius) {
	var resultFahrenheiht = tCelsius * 9 / 5 + 32;
	console.log(tCelsius + '°C' + ' = ' + resultFahrenheiht + '°F');
}

calculateCelsius(68);
calculateFahrenheiht(20);

// 4
function calcDivision(num1, num2) {
	var percents = num1 / num2 * 100;
	console.log(num1 + ' is ' + percents.toFixed(3) + '%' + ' from ' + num2);
}

calcDivision(25, 42);

// 5
function calcBiggerNum(num1, num2) {
	if (num1 === num2) {
		console.log(num1 + ' and ' + num2 + ' are equals.');
	} else if (num1 > num2) {
		console.log(num1);
	} else {
		console.log(num2);
	}
}

calcBiggerNum(15, 11);

// 7
function calcCircle(radius) {
	console.log('Area of circle is ' + radius * radius * 3.14);
}

calcCircle(10);

// 8
function calcCone(height, radius) {
	var volumeOfCone = 1 / 3 * 3.14 * (radius * radius) * height;
	console.log('Volume of cone is ' + volumeOfCone);
}
calcCone(20, 10);

// 9
function isPossibleTriangle(a, b, c) {
	if (a + b > c && a + c > b && b + c > a) {
		return true;
	}
	return false;
}

console.log(isPossibleTriangle(1, 2, 6));

// 10
function calcVolumeOfTriangle(a, b, c) {
	if (isPossibleTriangle()) {
		var s = (a + b + c) / 2;
		var result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
		console.log('Volume of triangle (Heronuv vzorec) is ' + result.toFixed(3));
	} else {
		console.log('Not possible to make triangle.');
	}
}
