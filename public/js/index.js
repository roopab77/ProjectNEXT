 
 $.ajax({
   type: "GET",
   url: "/loggedIn"
 }).then(
   function (data) {
     console.log("This is the UserName", data);
     if (data.id) {
       //alert("here");
       $("#sign-up-btn").attr("style", "display:none");
       $("#sign-in-btn").attr("style", "display:none");
       $("#my-profile-btn").text (data.firstname + " " + data.lastname);
       $("#log-out-btn").attr("style", "display:block");
     }
     else {
      $("#log-out-btn").attr("style", "display:none");
     }
   });

   