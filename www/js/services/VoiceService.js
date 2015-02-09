angular.module('VoiceService', [])

.factory('VoiceService', function(ColorService) {
  var voiceData = {};
  var lightKeys = ['one', 'two'];
  var colorKeys = ColorService.colorBank;
  var themeKeys = ['Vikings', 'Eagles', 'Timberwolves'];
  voiceData.analyze = function(command) {
    var i,x,y,z;
    var colorName;
    var lightName;
    var themeName;

    // checks for available light to change
    var wordArray = command.split(" ");
    for(i=0; i<wordArray.length; i++) {

      for (x=0; x<lightKeys.length; x++) {
        if (wordArray[i] === lightKeys[x]) {
          lightName = lightKeys[x];
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
    }

    // // checks for color/hue
    // wordArray = command.split(" ");
    // for(i=0; i<wordArray.length; i++) {

    //   for (x=0; x<colorKeys.length; x++) {
    //     if (wordArray[i] === colorKeys[x]) {
    //        colorName = colorKeys[x];
    //     }
    //   }
    // }

    // // checks for themes
    // wordArray = command.split(" ");
    // for(i=0; i<wordArray.length; i++) {

    //   for (x=0; x<lightKeys.length; x++) {
    //     if (wordArray[i] === lightKeys[x]) {
    //       lightName = lightKeys[x];
    //     }
    //   }
    // }
    if (colorName) {
        console.log(colorName);
      var hueNumber = ColorService.getHueValue(colorName);
      wordArray = [{"number": 1},{"hue": hueNumber}];
    }
    else if (themeName) {
        console.log(themeName);
      var hueObject = ColorService.getHueValue(themeName);
      console.log(hueObject.color1);
      wordArray = [{"hue": hueObject.color1}, {"hue": hueObject.color2}, {"name": hueObject.name}];
    }

    return wordArray;
  };
  return voiceData;
});
