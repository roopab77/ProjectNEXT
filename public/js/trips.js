$(document).ready(function () {
  
  $("#save-trip-btn").on("click", function () {
    event.preventDefault();
    
    console.log()
    var newTrip = {
      tripName: $("#tripName").val().trim(),
      tripStartDate: $("#tripStartDate").val(),
      tripEndDate: $("#tripEndDate").val()
    };

    $.ajax("/api/trips", {
      type: "POST",
      data: newTrip
    }).then(
      function (response) {
        console.log("created new trip");
        console.log(response);
        $("#message").text("Trip Added Succesfully");
        $("#trip-data").attr("style","display:block");        
        $("#trip_name").text(response.tripName);
        $("#from_date").text(response.tripStartDate);
        $("#to_date").text(response.tripEndDate);
        $("#add-trip").attr ("style","display:none");
        sessionStorage.setItem('tripID', response.id);
        const dest_url = "/destinations/" + response.id + "&" + response.tripName+ "&" + response.tripStartDate + "&" + response.tripEndDate;
        $("#add-destination-btn").attr("href",dest_url);
      });

  })

});
