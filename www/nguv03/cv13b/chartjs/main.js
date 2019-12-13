$(document).ready(() => {
  /*const canvas = document.querySelector('#chart');
    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'random vars',
                    data: [1,2,3,4,5,6],
                    backgroundColor: [
                        'red', 'green', 'blue', 'purple', 'orange', 'pink'
                    ]
                },
                {
                    label: 'random vars',
                    data: [10,20,30,40,50,60],
                    backgroundColor: [
                        'red', 'green', 'blue', 'purple', 'orange', 'pink'
                    ]
                }
            ]
        }
    });*/

    const fileInput = $('input[type="file"]');
    const reader = new FileReader();
    reader.onload = (e) => {
        var text = reader.result;
        console.log(text);
    };
    $('button').click(() => {
        $('h1').text('Changed');
        const file = fileInput.get(0).files[0];
        reader.readAsText(file, "utf-8");
        //reader.readAsDataURL(file);
        //reader.readAsBinaryString(file);
        //reader.readAsArrayBuffer(file);
    });
    
});