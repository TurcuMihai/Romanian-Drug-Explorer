var ctx = document.getElementById('firstBarChartPrevenire').getContext('2d');
var firstBarChartPrevenire= new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Numarul de beneficiari',
            data: [],
            backgroundColor: [
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
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

function redrawFirstBarChartPrevenire(labels,data) {
    firstBarChartPrevenire.data.labels = labels;
    firstBarChartPrevenire.data.datasets[0].data = data;
    firstBarChartPrevenire.update();
}
