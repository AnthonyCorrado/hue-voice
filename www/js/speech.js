function onDeviceReady(){
    console.log("Device is ready");
}

function recognizeSpeech() {
    var maxMatches = 1;
    var promptString = "Speak now"; // optional
    var language = "en-US";                     // optional
    window.plugins.speechrecognizer.startRecognize(function(result){
        document.getElementById("speechResults").value = result;
        if (result == "this is a test") {
            alert('holy fuck this really worked!!!');
        }
        else if (result == "Anthony") {
            alert('you mean the funniest person 2015!');
        }
    }, function(errorMessage){
        console.log("Error message: " + errorMessage);
    }, maxMatches, promptString, language);
}

// Show the list of the supported languages
function getSupportedLanguages() {
    window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
        // display the json array
        alert(languages);
    }, function(error){
        alert("Could not retrieve the supported languages : " + error);
    });
}

document.addEventListener("deviceready", onDeviceReady, true);