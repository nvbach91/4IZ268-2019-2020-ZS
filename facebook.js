$( document ).ready(function() {
    $("#ddrp1").on("change", function() {
        var c2;
        c2 = this.value; 

        switch (c2) { 
            case '0': 
                $('.cf').css('display', 'none');
                $('.sk').css('display', 'none');
            break;
            case '1': 
                $('.cf').css('display', 'inline-block');
                $('.sk').css('display', 'none');
            break;
        case '2': 
                $('.cf').css('display', 'none');
                $('.sk').css('display', 'inline-block');
        break;
        }

    });
});