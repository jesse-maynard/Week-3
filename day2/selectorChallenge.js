function vanPara(){
    alert("Bye!");
}

$(function (){
    $("#para1").load(vanPara);
    $("li:contains('1')").load(function(){
        $(this).hide();

    });
});

 function hideH3() {
            $("h3").fadeOut("slow", "linear");
        }