// function testFunc(num1, num2, num3) {
//     var a = num1 + num2 
//     var b = num2 + num3
//     if(a > b){
//         return true;
//     } else {
//         return false;
//     }

// }

// var myNum = testFunc(10, 3, 4);
// console.log(myNum);

var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for(var i =0; i <= myArray.length - 1;i++ ){
    console.log(myArray[i]);
}

for(i in myArray){
    console.log(myArray[i]);
}