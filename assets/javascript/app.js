
// Array to store legends
var legendArray = [];


// Function to get Gifs
function getGifs() {
    // Store user input to a variable
    var userInput = $("#InputName").val().trim();
    console.log(userInput);
    var apiKey = "dc6zaTOxFJmzC";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + userInput + "&limit=10";
    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        Method: "GET"
    }).done(function (queryResponse) {
        var gifs = queryResponse.data;
        $("#displayGifs").empty();
        for (var i = 0; i < gifs.length; i++) {
            var url = gifs[i].images.downsized.url;
            $("#displayGifs").append($("<img>").attr("src", url));
        }
    })
}

$("#addLegend").on("click", getGifs);