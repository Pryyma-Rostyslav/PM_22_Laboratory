//відкриття закриття пунктів Main More
const menuTriggers = $('.menu-trigger');
[...menuTriggers].forEach((trigger) => {
	trigger.addEventListener('click', ({ target }) => {
		const menuWrapper = target.closest('.menu-wrapper');
		menuWrapper.classList.toggle('expanded');
	});
});
//виділення поточного пункту меню
const menuItems = document.querySelectorAll('.sidebar li');
menuItems.forEach((item) => {
	item.addEventListener('click', ({ currentTarget }, arr) => {
		menuItems.forEach(item => {
			item.classList.remove('selected');
		})
		currentTarget.classList.add('selected');
	})
})
//обробка натиснення кнопки today
const todayButton=document.querySelector('#todayBtn')
todayButton.addEventListener('click', ({currentTarget})=>
{
	const span=currentTarget.querySelector('span');
	//console.log(span);
	if (span.innerText=='Today')
		span.innerText='Week'
	else
		span.innerText='Today'
	$.ajax("./data.json").done(function (responce) {
		if (document.querySelector('#todayBtn').querySelector('span').innerText=='Today')
		{
			let day = new Date().getDay();//номер дня тижня (перший день неділя)

			//визначення номера дня тижня (перший день понеділок)
			if (day==0)
				day=6;
			else
				day--;
			responce.PAChart1.forEach((elem, index, arr)=>{
				if (index!=day)
				{
					arr[index]=0;
				}
			})
		}
		PAChart.data.datasets[0].data = responce.PAChart1;
		PAChart.data.datasets[1].data = responce.PAChart2;
		PAChart.update();
	})
})

//графіки
const COLORS = {
borderColor: '#f2f6fc',
blue: '#7faef5',
purple: '#f772e3',
yellow: '#acc236'
};

let chart1 = document.querySelector('#ProjectActivityChart').getContext('2d');
let labels=[];//масив підписів підписів для графіка
let days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']//масив днів тижня
let monthes=['January', 'February','March','April','May', 'June','July','August','September','October','November','Desember' ]//масив місяців
let day = new Date().getDay();//номер дня тижня (перший день неділя)

//визначення номера дня тижня (перший день понеділок)
if (day==0)
day=6;
else
day--;

let date = new Date().getDate();//номер дня в місяці
let month=new Date().getMonth();//номер місяця
for (let i=0;i<7;i++)
{
labels.push(`${days[i]} ${date-day+i} ${monthes[month]}`)//формуємо підписи діаграми у вигляді Понеділок 18 грудня
}
let PAChart = new Chart(chart1, {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'My First dataset',
borderColor: COLORS.borderColor,
backgroundColor: 'rgb(232, 97, 185,0.7)',
tension: 0.5,
fill: true,
data: [],
pointRadius: [0, 7, 7, 7, 7, 7, 0],

pointBackgroundColor: 'gray',
}, {
label: 'My Second dataset',
borderColor: COLORS.borderColor,
backgroundColor: COLORS.blue,
fill: true,
tension: 0.5,
data: [],
pointRadius: 1,
pointBackgroundColor: 'white',
}],
},
options: {
responsive: true,
tooltips: {
mode: 'index',
},
hover: {
mode: 'index'
},
scales: {
y: {
display: false,
},
},
plugins: {
legend: {
display: false
}
}
}
})

let chart2 = document.querySelector('#ManagersActivityChart').getContext('2d');
let MAChart = new Chart(chart2, {
type: 'bar',
data: {
labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
datasets: [{
label: 'My First Dataset',
data: [],
backgroundColor: 'rgba(55, 164, 237, 0.9)',
hoverBackgroundColor: 'rgba(222, 22, 52,1)',
borderWidth: 1
}]
},

options: {
plugins: {
legend: {
display: false
}
},

scales: {
y: {
beginAtZero: true,
display: false,
gridLines: {
display: false
}
},
x: {
gridLines: {
display: false
}
}
}

},
})

let colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

/* 3 donut charts */
let donutOptions = {
cutoutPercentage: 85,
legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
};

// donut 1
let chDonutData1 = {
labels: ['Views'],
datasets: [
{
backgroundColor: ['#5cd93d', '#e6e9ed'],
borderWidth: 0,
data: [4782, 1480]
}
]
};

let chDonut1 = document.getElementById("chDonut1");
let chDonutChart1 = new Chart(chDonut1, {
type: 'doughnut',
data: chDonutData1,
options: donutOptions,
onAnimationComplete: function () {

var ctx = this.chart.ctx;
ctx.font = this.scale.font;
ctx.fillStyle = this.scale.textColor
ctx.textAlign = "center";
ctx.textBaseline = "bottom";

this.datasets.forEach(function (dataset) {
dataset.points.forEach(function (points) {
ctx.fillText(points.value, points.x, points.y - 10);
});
})
}
});

// donut 2
let chDonutData2 = {
labels: ['Users'],
datasets: [
{
backgroundColor: ['#d93da0', '#e6e9ed'],
borderWidth: 0,
data: [1263, 853]
}
]
};
let chDonut2 = document.getElementById("chDonut2");
let chDonutChart2 = new Chart(chDonut2, {
type: 'doughnut',
data: chDonutData2,
options: donutOptions
});

// donut 3
var chDonutData3 = {
labels: ['Purchases'],
datasets: [
{
backgroundColor: ['#5596f2', '#e6e9ed'],
borderWidth: 0,
data: [394, 450]
}
]
};
var chDonut3 = document.getElementById("chDonut3");
let chDonutChart3 = new Chart(chDonut3, {
type: 'doughnut',
data: chDonutData3,
options: donutOptions
});

$.ajax("./data.json").done(function (responce) {
if (document.querySelector('#todayBtn').querySelector('span').innerText=='Today')
{
let day = new Date().getDay();//номер дня тижня (перший день неділя)

//визначення номера дня тижня (перший день понеділок)
if (day==0)
day=6;
else
day--;
responce.PAChart1.forEach((elem, index, arr)=>{
if (index!=day)
{
arr[index]=0;
}
})
}
PAChart.data.datasets[0].data = responce.PAChart1;
PAChart.data.datasets[1].data = responce.PAChart2;
PAChart.update();
MAChart.data.datasets[0].data = responce.MAData;
MAChart.update();
chDonutChart1.data.datasets[0].data = responce.VisitsView
chDonutChart1.update();
chDonutChart2.data.datasets[0].data = responce.VisitsUsers
chDonutChart2.update();
chDonutChart3.data.datasets[0].data = responce.VisitsPurchases
chDonutChart3.update();

});