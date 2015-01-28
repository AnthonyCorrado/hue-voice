angular.module('ColorService', [])

.factory('ColorService', ['RegisterService', function(RegisterService) {

    colorData = {};

    colorData.getHueValue = function(color) {
        var value;
        switch (color) {
            case "red":
                value = 0;
                break;
            case "orange":
                value = 6620;
                break;
            case "yellow":
                value = 16400;
                break;
            case "green":
                value = 25582;
                break;
            case "white":
                value = 34800;
                break;
            case "light":
                value = 41680;
                break;
            case "blue":
                value = 46300;
                break;
            case "purple":
                value = 50300;
                break;
            case "pink":
                value = 54900;
                break;
            case "hot":
                value = 61222;
                break;
            case "silver":
                value = 34000;
                break;
            }
        return value;
    };
    return colorData;

}])

.factory('ThemesModel', function() {
  return [
    {'name': 'Vikings', 'color1': 'purple', 'color2': 'yellow'},
    {'name': 'Eagles', 'color1': 'green', 'color2': 'silver'},
    {'name': 'Timberwolves', 'color1': 'blue', 'color2': 'green'},
    {'name': 'Smooth', 'color1': 'purple', 'color2': 'blue'},
    {'name': 'Eagles', 'color1': 'green', 'color2': 'silver'},
    {'name': 'Timberwolves', 'color1': 'blue', 'color2': 'green'},
  ];

  // var allThemes = {};

  // allThemes.getThemes = function() {
  //   var i,x;
  //   console.log(themes.length);
  //   for (i=0; i<themes.length; i++) {
  //     console.log(themes[i].color1);
  //   } 
  // };

});