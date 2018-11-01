$(document).ready(function () {
  // console.log("I made it to reviews.js")
  // var userid = req.user.id;
  // console.log("from reviews.js - req " + userid);
  // // Get saved data from sessionStorage
  // // var userid = sessionStorage.getItem("dataStored");



  $("#save-review-btn").on("click", function () {
    console.log("made it to reviews button click")
    event.preventDefault();
    var newReview = {

      titleCategory: $("#category").val().trim(),
      rating: $("#rating").val(),
      review: $("#review-input").val(),
      // destinationId : destinationid

    };
    $.ajax("/api/reviews", {
      type: "POST",
      data: newReview
    }).then(
      function () {
        console.log("created new review");
        //console.log(data);
        $("#message").text("review Added Succesfully");
        console.log(response);
      });
    // Reload the page to get the updated list
    //location.reload();
  });
})
//A function to get trip and then render our list of trips
// function getTrips(userid) {
//   app.get("/api/reviews", renderTripsList);
// }
// Function to either render a list of trips, or if there are none, direct the user to the page
// to create a trip first
// function renderTripsList(data) {
//   if (!data.length) {
//     window.location.href = "/trips";
//   }
//   $(".hidden").removeClass("hidden");
//   var rowsToAdd = [];
//   for (var i = 0; i < data.length; i++) {
//     rowsToAdd.push(createTripRow(data[i]));
//   }
//   tripSelect.empty();
//   console.log(rowsToAdd);
//   console.log(tripSelect);
//   tripSelect.append(rowsToAdd);
//   tripSelect.val(tripId);
// }

// // Creates the trip options in the dropdown
// function createTripRow(trip) {
//   var listOption = $("<option>");
//   listOption.attr("value", Trips.id);
//   listOption.text(Trips.tripName);
//   return listOption;
// }