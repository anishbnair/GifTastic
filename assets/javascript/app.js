

// Array to hold legend names
var legendList = ["Federer", "Messi", "Michael Jordan", "Sachin Tendulkar"];

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

// Function to display gifs when user click on each legend button
function displayGifs() {
    var legendName = $(this).attr("data-name");
    var apiKey = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + legendName + "&api_key=" + apiKey + "&rating=pg&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (queryResponse) {

        var results = queryResponse.data;

        $("#displayGifs").empty();

        for (var i = 0; i < results.length; i++) {
            var legendDiv = $("<div class='legend-div'>");
            var ratingInfo = $("<p>").text("Rating: " + results[i].rating);
            var legendGif = $("<img>");
            legendGif.addClass("legendGif");

            legendGif.attr("src", results[i].images.downsized_still.url);
            legendGif.attr("data-still", results[i].images.downsized_still.url);
            legendGif.attr("data-animate", results[i].images.downsized.url);
            legendGif.attr("data-state", "still");
            legendDiv.append(ratingInfo);
            legendDiv.append(legendGif);
            $("#displayGifs").append(legendDiv);
        }
    })
}

// Click event function when user add new legend
$("#addLegend").on("click", function (event) {
    $("#displayGifs").empty();
    event.preventDefault();

    var newLegendName = $("#userInput").val().trim();
    var duplicateLegend = jQuery.inArray(newLegendName, legendList);

    // Button won't be created for empty and duplicate inputs
    if (newLegendName === "") {
        return;
    } else if (duplicateLegend !== -1) {
        $("#userInput").val("");
        return;
    } else {
        legendList.push(newLegendName);
        $("#userInput").val("");
        // Call renderButtons function
        renderButtons();
    }
})

// Click event function to animate gifs or make it still when user click on images
$(document).on("click", ".legendGif", function () {

    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// Call DiplayGifs function when user click on legend name button
$(document).on("click", ".legendButton", displayGifs);

$(document).ready(function () {
    // Call renderButtons function
    renderButtons();
})
