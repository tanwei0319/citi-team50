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
<<<<<<< HEAD
        text: 'Did you spend happily?'
    },

    subtitle: {
        text: "Let's find out"
=======
        text: 'User Spending Data'
    },

    subtitle: {
        text: 'Source: citibank.com'
>>>>>>> a0a3443da6c58094988c2173fa617f30eb4e1355
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
        data: [2, , 3, -5, 6, 7, 1, -3, 7, 4, 3, 2]
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
