$(document).ready(() => {
    
    const context = document.querySelector('#chart');
    const chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'Abc',
                    data: [10, 20, 30, 40, 50, 60],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                },
                {
                    label: 'def',
                    data: [100, 200, 300, 400, 500, 600],
                    backgroundColor: [
                        'rgba(205, 99, 132, 0.8)',
                        'rgba(154, 162, 235, 0.8)',
                        'rgba(55, 206, 86, 0.8)',
                        'rgba(105, 192, 192, 0.8)',
                        'rgba(13, 102, 255, 0.8)',
                        'rgba(25, 159, 64, 0.8)'
                    ],
                }
            ]
        }
    });
});