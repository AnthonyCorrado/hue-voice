angular.module('ColorService', [])

.factory('ColorService', ['RegisterService', function(RegisterService) {

    colorData = {};

    colorData.colorBank = [
        'red', 'green', 'blue', 'orange',
        'purple', 'pink', 'yellow', 'silver',
        'white', 'neon', 'sky'
    ];

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
            case "sky":
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
            case "neon":
                value = 61222;
                break;
            case "silver":
                value = 34000;
                break;
            case "Eagles":
                value = {'name': 'Eagles', 'color1': 'green', 'color2': 'silver'};
                break;
            case "Vikings":
                value = {'name': 'Vikings', 'color1': 'purple', 'color2': 'yellow'};
                break;
            case "Timberwolves":
                value = {'name': 'Timberwolves', 'color1': 'blue', 'color2': 'green'};
                break;
            case "princess":
                value = {'name': 'Smooth', 'color1': 'purple', 'color2': 'blue'};
                break;
            }
        return value;
    };
    return colorData;

}])

.factory('ThemesModel', function() {
    var themesData = {};

    themesData.getAllThemes = function() {
        return [
            {'name': 'Vikings', 'color1': 'purple', 'color2': 'yellow'},
            {'name': 'Eagles', 'color1': 'green', 'color2': 'silver'},
            {'name': 'Timberwolves', 'color1': 'blue', 'color2': 'green'},
            {'name': 'Smooth', 'color1': 'purple', 'color2': 'blue'},
            {'name': 'Eagles', 'color1': 'green', 'color2': 'silver'},
            {'name': 'Timberwolves', 'color1': 'blue', 'color2': 'green'},
        ];
    };

    return themesData;


  // var allThemes = {};

  // allThemes.getThemes = function() {
  //   var i,x;
  //   console.log(themes.length);
  //   for (i=0; i<themes.length; i++) {
  //     console.log(themes[i].color1);
  //   } 
  // };

});