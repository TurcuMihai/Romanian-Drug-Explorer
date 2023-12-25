var ctx = document.getElementById('barChartInfractiuni').getContext('2d');
var barChartInfractiuni = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Numarul de pedepse',
            data: [],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
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

function redrawBarChartInfractiuni(labels,data) {
    barChartInfractiuni.data.labels = labels;
    barChartInfractiuni.data.datasets[0].data = data;
    barChartInfractiuni.update();
}
