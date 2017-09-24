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
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
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

    plotOptions: {
        series: {
            pointStart: 2010
        }
    },

    series: [{
        name: 'Transaction Amount',
        data: [43934, 52503, 57177, 69658, 60000, 50000, 137133, 50000, 34000, 154175, 12000, 10000]
    }, {
        name: 'Sentiment Score',
        data: [24916, 24064, 70000, 29851, 60000, 30282, 38121, 40434, 30000, 50000, 60000, 90000]
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