var ctx = document.getElementById('pieChartUrgente').getContext('2d');
var pieChartUrgente = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: 'Dataset',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
    }]
  },
  options: {
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: 'rgba(0, 0, 0, 0.8)' // Set x-axis label font color
            }
        },
        y: {
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
                beginAtZero: true,
                color: 'rgba(0, 0, 0, 0.8)'
            }
        }
    },
    plugins: {
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'rgb(255, 255, 255)',
            bodyColor: 'rgb(255, 255, 255)',
            titleFont: {
                size: 14
            },
            bodyFont: {
                size: 12
            },
            displayColors: false
        }
    },
    layout: {
        padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    }
}
});

function redrawPieChartUrgente(labels, data) {
    pieChartUrgente.data.labels = labels;
    pieChartUrgente.data.datasets[0].data = data;
    pieChartUrgente.update();
  }
