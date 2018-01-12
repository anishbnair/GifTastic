

// Array to hold legend names
var legendList = ["Federer", "Messi", "Kobe", "Ronaldo"];

// Functton to render buttons as per list of items in the array
function renderButtons() {
    $("#legendButtons").empty();
    // Create a button for each item in the array list 
    for (var i = 0; i < legendList.length; i++) {
        var tempButton = $("<button>");
        tempButton.addClass("legendButton btn btn-success");
        tempButton.attr("data-name", legendList[i]);
        tempButton.text(legendList[i]);
        $("#legendButtons").append(tempButton);
    }
}

$(document).ready(function () {
    // Call renderButtons function
    renderButtons();
})
