angular.module('VoiceService', [])

.factory('VoiceService', function(ColorService, LightSelectorService) {
    var voiceData = {};
    var lightKeys = ['one', 'two', 'standing', 'floor', 'floorstanding', 'desktop'];
    var colorKeys = ColorService.colorBank;
    var themeKeys = ['Vikings', 'Eagles', 'Timberwolves'];
    var actionKeys = ['on', 'off', 'dim'];

    voiceData.analyze = function(command) {
        var i,x,y,z,a;
        var colorName;
        var lightName;
        var themeName;
        var actionName;

        // checks for available light to change
        var wordArray = command.split(" ");
        for(i=0; i<wordArray.length; i++) {

          for (x=0; x<lightKeys.length; x++) {
            if (wordArray[i] === lightKeys[x]) {
              lightName = lightKeys[x];
              console.log(lightName);
            }
          }
          for (y=0; y<colorKeys.length; y++) {
            if (wordArray[i] === colorKeys[y]) {
               colorName = colorKeys[y];
            }
          }
          for (z=0; z<themeKeys.length; z++) {
            if (wordArray[i] === themeKeys[z]) {
               themeName = themeKeys[z];
            }
          }
          for (a=0; a<actionKeys.length; a++) {
            if (wordArray[i] === actionKeys[a]) {
               actionName = actionKeys[a];
            }
          }
        }

        // ------------- determines action to take based on keywords ----------------

        // changes to a specified color. If no light is specified lamp 1 is changed to specified color
        if (colorName) {
            console.log(colorName);
            var lightNum;
            var hueNumber = ColorService.getHueValue(colorName);
            if (lightName) {
                lightNum = LightSelectorService.getLightNum(lightName);
            }
            else {
                lightNum = 1;
            }
            wordArray = [{"number": lightNum},{"hue": hueNumber}];
            console.log(wordArray);
        }

        // if theme is given all lights adjust 
        else if (themeName) {
            console.log(themeName);
            var hueObject = ColorService.getHueValue(themeName);
            console.log(hueObject.color1);
            wordArray = [{"hue": hueObject.color1}, {"hue": hueObject.color2}, {"name": hueObject.name}];
        }

        // action to turn specified light on or off 
        else if (actionName) {
            var lightNumAlt;
            var hueOn = LightSelectorService.lightAction(actionName);
            console.log(hueOn);
            if (lightName) {
                lightNumAlt = LightSelectorService.getLightNum(lightName);
            }
            else {
                lightNumAlt = 1;
            }
            wordArray = [{"number": lightNumAlt},{"on": hueOn}];
        }

        return wordArray;
    };

    return voiceData;
});
