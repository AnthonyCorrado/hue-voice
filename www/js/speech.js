function onDeviceReady(){
    console.log("Device is ready");
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