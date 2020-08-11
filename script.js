/*jshint esversion: 6 */
let defaultwarningmessage = "This sometimes happens when microphone access has been disabled.";
$(document).ready(function(){
    var warningcontent = $("#warningcontent");
    var acceptbtn = $("#accept");
    var callwindow = $("#callwindow");
    acceptbtn.hover(
        function() { 
            if (acceptbtn.hasClass("inactivecallbutton"))
                openWarning(acceptbtn); 
        },
        function() { 
            if (acceptbtn.hasClass("inactivecallbutton"))
                closeWarning(acceptbtn); 
        }
    );
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        acceptbtn.removeClass("inactivecallbutton");
      })
      .catch(function(err) {
        acceptbtn.addClass("inactivecallbutton");
        warningcontent.html(defaultwarningmessage);
      });
    $(".togglebtn").click(function(){
        callwindow.fadeTo("fast",1.0);
        $(this).fadeOut("fast");
    });
    
    $("#minimize").click(function(){
        callwindow.fadeOut("fast");
        $(".togglebtn").fadeTo("fast", 1.0);
    });
});

function openWarning(acceptbtn){
    var warningbox = $(".warningbox");
    if(acceptbtn.hasClass("inactivecallbutton")){
        warningbox.clearQueue();
        warningbox.fadeTo("fast", 0.85);
    }
}
function closeWarning(acceptbtn){
    var warningbox = $(".warningbox");
    if(acceptbtn.hasClass("inactivecallbutton")){
        warningbox.clearQueue();
        warningbox.fadeTo("fast", 0);
    }
}