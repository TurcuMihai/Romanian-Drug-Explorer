var ctx = document.getElementById('lineChartConfiscari').getContext('2d');
var lineChartConfiscari = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Numarul de grame confiscate',
            data: [],
            backgroundColor: 'rgba(75, 192, 192,0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointBorderColor: 'rgb(255, 255, 255)',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },
    options: {
        scales: {
            x: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)' // Set x-axis label font color
                }
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)' // Set x-axis label font color
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
        backgroundColor: 'rgb(255, 255, 255)'
    }
});


function redrawLineChartConfiscari(labels, data) {
    lineChartConfiscari.data.labels = labels;
    lineChartConfiscari.data.datasets[0].data = data;
    lineChartConfiscari.update();
}