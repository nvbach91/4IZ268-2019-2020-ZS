
// task 1 + 3 (in comment)
//var year = 2000;
var calcAge = function (year){
    var date = new Date();
    var age = date.getFullYear() - year;
    return 'Pepe is '+ age + ' year old.' ;
};
//console.log (calcAge(year));

// task 2 + 3 (in comment)
// number = 20;
// from = 'C';
var convert = function (number, from) {
    if (from === 'F'){
        return number + 'Â°F = '+ (((number - 32)* 5) / 9) +'C.';
    }
    else {
        return number + 'Â°C = '+ (((number * 9 )/ 5 )+ 32)  +'F.';
    }
    
};
// console.log (convert (number, from));

// task 4
var toPercent = function (number1, number2){
    if (number2 === 0){
        return 'Can not divide by zero! Operation not defined.';
    }
    else {
    var result = ((number1/number2)*100).toFixed(2);
    return number1 +' is '+result+'% from '+number2; 
    }
};

// task 5
var biggerOne = function (number1, number2){
    if( number1 > number2){
        return number1+' is bigger than '+number2;
    }
    if (number1 === number2){
        return number1+' = '+number2;
    }
    else{
        return number2+' is bigger than '+number1;
    }
};

//task 6 with while-do
var multiple13while = function (){
    var result=0;
    var results=[];
    var i=0;
    while (true){
        var result=13*i;
        if(result <= 730){
            results.push(result);
            i++;
        }
        else{
            break;
           
        }
    };
    return results;
};
// task 6 with for
var multiple13for = function (){
    var result=0;
    var results=[];
    var i=1;
    var runs=0;
    for ( var i=0; i< 100; i++){
        var result=13*i;
        if(result <= 730){
            results.push(result);
        }
        else{
            break;
           
        }

    };
    return results;
}
// task 7
var area = function (r){
    return 'Area of circle is '+(3.14*(Math.pow(r,2)));
};

// task 8
var volume = function(v,r){
    return 'Volume of cone is '+((1/3)*3.14*(Math.pow(r,2))*v);
};

// task 9
var triangleTest = function (a,b,c){
    if ((Math.abs(a)+ Math.abs(b) > Math.abs(c))&& (Math.abs(b)+ Math.abs(c) > Math.abs(a)) && (Math.abs(a)+ Math.abs(c) > Math.abs(b))){
        return true;
    }
    else{
        return false;
    }
};

// task 10
var triangleArea = function (a,b,c){
    if(triangleTest(a,b,c)===true){
        var s = (a+b+c)/2;
        var area = Math.sqrt(s*((s-a)*(s-b)*(s-c)));
        return 'Area of this triangle is '+area;
    }
    else{
        return 'Not a triangle.'
    }
};