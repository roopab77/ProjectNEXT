$(document).ready(function () {

      $("#searchButton").on("click", function (event) {
            $("#list-group1").empty();
            $("#list-group2").empty();
            $("#list-group3").empty();
            event.preventDefault();
            let searchedReview = $("#searchedPlace").val().trim();
            console.log("Searched Review")
            console.log(searchedReview);


            $.get("/reviews-searching/" + searchedReview, function (data) {
                        console.log("data");
                        console.log(data);
                        if (data == "empty") {
                         alert("No Reviews!");
                        } else {
                        Object.keys(data).map(function (key) {
                              console.log(data[key]);
                              data[key].forEach(review=> {
                                    console.log(review);
                                    $("#list-group1").append("<li>" + review.titleCategory + "</li>");
                                    $("#list-group2").append("<li>" + review.rating + "</li>");
                                    $("#list-group3").append("<li>" + review.review + "</li>")
                              });
                        
                        
                        })
                        }
                  }

            )
      })
});