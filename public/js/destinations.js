
$(document).ready(function (){
  
  $.ajax("/countries", {
    type: "GET"
  }).then(function(data){ 
    //console.log(data);
    var countriestag = $("#countries");
    renderitems(data,countriestag);
  });

  $("#btn-add-destination").on("click",function(){    
    var tripid = $("#trip-id").text();
    //console.log(tripid);
    var newDestination = {
      destinationCountry: $("#countries option:selected").text(),
      destinationState: $("#states option:selected").text(),
      destinationCity: $("#cities option:selected").text(),
      dateFrom: $("#dateFrom").val(),
      dateTO :  $("#dateTo").val(),
      TripId : tripid
    };
    console.log(newDestination);
    $.ajax("/destinations", {
      type: "POST",
      data: newDestination
    }).then(
      function (response) {
        console.log("created new destination");
        $("#added-destinations").attr("style","display:block");
        createLiTag(response);
        //console.log(response);
        $("#dateFrom").val("");
        $("#dateTo").val("");
        $("#cities option:selected").text("");
        $("#states option:selected").text("");
        $("#countries option:selected").text("");

      });
  });

  
});

function createLiTag(response)
{
    var htmlTag = `
    <li> <h6><div class="row">
    <div class="col"><span>Destination :</span><span> ${response.destinationCity}, ${response.destinationState} - ${response.destinationCountry}</span></div></div>
    <div class="row">
  <div class="col-6">From : ${response.dateFrom}</div><div class="col-6">To: ${response.dateTO}</div><div class="col"></div></div></h6></li>`;
  $("#destinations-ul").append(htmlTag);
}

function getStates(selectedID)
{
  
  const url = "/states/" + selectedID;

  $.ajax(url, {
    type: "GET"
  }).then(function(data){
    var statesstag = $("#states");
    renderitems(data,statesstag);
  });

}

function getCities(selectedID)
{
  
  const url = "/cities/" + selectedID;

  $.ajax(url, {
    type: "GET"
  }).then(function(data){
    var citiestag = $("#cities");
    renderitems(data,citiestag);
  });

}

function renderitems(data,htmlitem) {
  var SelectedItem = htmlitem;
  if (!data.length) {
    //window.location.href = "/authors";
  }
  $(".hidden").removeClass("hidden");
  var rowsToAdd = [];
  rowsToAdd.push(createRow("..."));
  for (var i = 0; i < data.length; i++) {
    
    rowsToAdd.push(createRow(data[i]));
  }
  SelectedItem.empty();
  SelectedItem.append(rowsToAdd);
  SelectedItem.val();
  
}

function createRow(item) {
  var listOption = $("<option>");
  listOption.attr("value", item.id);
  
  listOption.text(item.name);
  return listOption;
}

