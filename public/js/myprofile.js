$(document).ready(function () {

  $(".get-destinations-all").on("click", function () {
    const tripID = $(this).val();
    const url = "/getdestinations/" + tripID;
    var htmlTable = $(this).parent().closest('tr');
    console.log(htmlTable);
    var destinationsTable;

    $.ajax(url, {
      type: "GET"
    }).then(function (data) {
      console.log(data);
      destinationsTable = createDestTable(data);
      //console.log(destinationsTable); 
      $("#destinations-table").html(destinationsTable);

    });


  });

  $(document).on('click', ".dropdown-menu li a", function () {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  });

  $(document).on('click', '.btn-add-review', function () {
    // alert("This id" + $(this).val());
    const destinationID = $(this).val();
    const category = $(this).parent().parent().find(".review-category").text();
    const rating = $(this).parent().parent().find(".review-rating").val();
    const review_text = $(this).parent().parent().find(".review-text").val();
    $(this).parent().parent().find(".review-category").text("Review");
    $(this).parent().parent().find(".review-rating").text("Rating");
    $(this).parent().parent().find(".review-text").val("");
    const spantag = $(this).parent().parent().find(".message");
    var newReview = {
      titleCategory: category,
      review: review_text,
      rating: rating,
      DestinationId: destinationID
    };
    console.log(newReview);
    $.ajax("/reviews", {
      type: "POST",
      data: newReview
    }).then(
      function (response) {
        spantag.text("Review added succesfully. Add another if you want to ");
        console.log("created new review");
      });
  });

  $(document).on('click', '.btn-send-email', function () {
    const subject = "Trip Details";
    var to = $(this).parent().parent().find(".to-email-id").val();
    var email = $(this).parent().parent().find(".to-email-id");
    const tripID = $(this).val();
    const url = "/getdestinations/" + tripID;
    $.ajax(url, {
      type: "GET"
    }).then(function (data) {
      console.log(data);
      var destinationsTable = createDestTableForEmail(data);     

      $.get("/api/send-email", {
        to: to,
        subject: subject,
        text: destinationsTable
      }, function (data) {
        if (data == "sent") {
          console.log(data);
          email.val("Message Sent");
          
        }

      });

    });
  });
});

function getDestinations(tripID) {

  console.log(destinationsTable);
  return destinationsTable;
}

function createDestTable(data) {
  var tableforDestinations = `
<table class="table table-bordered table-light" value="table-destination" id="destinations-table"><thead><tr>
      <th scope="col">Country/State/City</th>      
      <th scope="col">Review Category</th>
      <th scope="col">Rating</th>
      <th scope="col">Review Text</th>      
      <th scope="col">Add Review</th>
      </tr></thead>`;
  data.forEach(destination => {
    tableforDestinations += `<tr>
      <td>${destination.destinationCountry}/${destination.destinationState}/${destination.destinationCity}</td>      
      <td><div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle review-category" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Review<span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item" href="#wrt">Food</a></li>
      <li><a class="dropdown-item" href="#rwtrwt">Hotels</a></li>
      <li><a class="dropdown-item" href="#rwtwrt">Attractions</a></li>
    </ul>
    </div></td>
      <td><div class="dropdown">
      
      <button class="btn btn-secondary dropdown-toggle review-rating" type="button" data-toggle="dropdown" aria-haspopup="true"
      aria-expanded="false" >
      Rating<span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item" data-value="1">1(Strongly Disagree)</a></li>
      <li><a class="dropdown-item" data-value="2">2</a></li>
      <li><a class="dropdown-item" data-value="3">3</a></li>
      <li><a class="dropdown-item" data-value="4">4</a></li>
      <li><a class="dropdown-item" data-value="5">5(Strongly Agree)</a></li>
    </ul>
    </div></td>
      <td><textarea class="form-control review-text" aria-label="With textarea"></textarea></td>
      <td><button type="button" value="${destination.id}" class="btn btn-outline-success btn-add-review">Add a Review</button><div><span class="message"></span></div></td>     
      </tr>`;
  });
  tableforDestinations += '</table>';
  return tableforDestinations;
}

function createDestTableForEmail(data){
  var tableforDestinations = `
  <table class="table table-bordered table-light" value="table-destination" id="destinations-table"><thead><tr>
        <th scope="col">Country/State/City</th> 
        <th scope="col">From Date</th>
        <th scope="col">To Date</th>
        </tr></thead>`;
    data.forEach(destination => {
      tableforDestinations += `<tr>
        <td>${destination.destinationCountry}/${destination.destinationState}/${destination.destinationCity}</td>     
        <td>${destination.dateFrom}</td>
        <td>${destination.dateTO}</td>
           
        </tr>`;
    });
    tableforDestinations += '</table>';
    return tableforDestinations;

}