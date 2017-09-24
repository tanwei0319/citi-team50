var priceInput = document.getElementById('priceInput');
var purchaseInput = document.getElementById('purchaseInput');

function submit() {
	var warning = document.getElementById('warning');
	priceInput.value = ''
	purchaseInput.value = ''
	show(warning);

}

function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
}

Highcharts.chart('container', {

    title: {

        text: 'Did you spend happily?'
    },

    subtitle: {
        text: "Let's find out"
    },

    yAxis: {
        title: {
            text: 'Impulse Spending Tracker'
        }
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    series: [{
        name: 'Transaction Amount',
        data: [10, 30, 40, 15, 20, 10, 30, 34, 43, 50, 24, 22]
    }, {
        name: 'Sentiment Score',
        data: [20, 0, 30, -50, 60, 70, 10, -30, 70, 40, 30, 20]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
