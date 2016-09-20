function myButton_Click() {
    alert("Clicked!");
}

$(function() {
    // Wire up the click event handler.
    $('#myButton').on('click', myButton_Click);

    $("li:contains('mad')").on("click", function(){
            $(this).hide();
        });
});

 
