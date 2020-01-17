/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()

  // Graphs
  var ctx = document.getElementById('mychart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'First semester',
        'Second semester',
        'Third semester',
        'Fourth semester',
        'Fifth semester',
        'Sixth semester',
      ],
      datasets: [{
        data: [
          36,
          40,
          39,
          0,
          0,
          0,
        ],
        lineTension: 0,
        backgroundColor: 'rgba(17, 119, 102)',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });
}())