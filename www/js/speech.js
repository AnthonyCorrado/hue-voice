function onDeviceReady(){
    console.log("Device is ready");
}

function recognizeSpeech() {
    var maxMatches = 5;
    var promptString = "Speak now"; // optional
    var language = "en-US";                     // optional
    window.plugins.speechrecognizer.startRecognize(function(result){
        alert(result);
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