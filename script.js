

/*jshint esversion: 6 */
let defaultwarningmessage = "This sometimes happens when microphone access has been disabled.";
let warningmessage = defaultwarningmessage;
$(document).ready(function(){
    var warningcontent = $("#warningcontent");
    var acceptbtn = $("#accept");
    var callwindow = $("#callwindow");


    warningcontent.html(warningmessage);
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
        if (err.message === "Requested device not found"){
            warningmessage = "Your device does not seem to have an active microphone";
            warningcontent.html(warningmessage);
        }
        else if (err.message === "Permission denied"){
            warningmessage = "Microphone access has been disabled for this website";
            warningcontent.html(warningmessage);
        }
        else{
            warningcontent.html(defaultwarningmessage);
        }
      });
    $(".togglebtn").click(function(){
        callwindow.fadeTo("fast",1.0);
        console.log("HERE");
    });
    
    $("#minimize").click(function(){
        callwindow.fadeOut("fast");
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