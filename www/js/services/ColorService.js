angular.module('ColorService', [])

.factory('ColorService', ['RegisterService', function(RegisterService) {

    colorData = {};

    colorData.colorBank = [
        'red', 'green', 'blue', 'orange',
        'purple', 'pink', 'yellow', 'silver',
        'white', 'neon', 'sky'
    ];

    colorData.getHueValue = function(color) {
        var value = {};
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

    colorData.getColorValue = function(hue) {
        var color = "";
        if (hue < 5000) {
            color = "red";
        }
        else if (hue >= 5000 & hue < 13000) {
            color = "orange";
        }
        else if (hue >= 13000 & hue < 20000) {
            color = "yellow";
        }
        else if (hue >= 20000 & hue < 31000) {
            color = "green";
        }
        else if (hue >= 31000 & hue < 41000) {
            color = "white";
        }
        else if (hue >= 41000 & hue < 47000) {
            color = "blue";
        }
        else if (hue >= 47000 & hue < 53500) {
            color = "indigo";
        }
        else if (hue >= 53500 & hue < 59000) {
            color = "hotpink";
        }
        else if (hue >= 59000 & hue < 62500) {
            color = "deeppink";
        }
        else if (hue >= 62500) {
            color = "red";
        }

        else {
            color = "black";
        }
        console.log(color);
        return color;
    };

    colorData.setShadowColor = function(color) {
        newHue = "2px 2px 5px 1px " + color;
        return {
            "-webkit-box-shadow": newHue,
            "-moz-box-shadow": newHue,
            "box-shadow": newHue
        };
    };

    return colorData;

}])

.factory('ThemesModel', function(ColorService, LightingService) {
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

    themesData.themeSelect = function(colorObj) {
        var themeData = {};
        var col1, col2;

            col1 = ColorService.getHueValue(colorObj.color1.hue);
            col2 = ColorService.getHueValue(colorObj.color2.hue);
            var body = [{"hue": col1}, {"hue": col2}];
            for (i=1; i<body.length+1; i++) {
              LightingService.lightAction(i , body[i-1]);
        }
        return themeData;
    };

    return themesData;

});