angular.module('LightSelectorService', [])

.factory('LightSelectorService', function() {

    var lightData = {};

    lightData.getLightNum = function(keyword) {

        var value = {};
        switch (keyword) {
            case "one":
                value = 1;
                break;
            case "floor":
                value = 1;
                break;
            case "standing":
                value = 1;
                break;
            case "floorstanding":
                value = 1;
                break;
            case "1":
                value = 1;
                break;
            case "2":
                value = 2;
                break;
            case "desktop":
                value = 2;
                break;
            case "lamp":
                value = 2;
                break;
        }
        return value;
    };

    lightData.lightAction = function(action) {
        var value = {};
        console.log(action);

        switch (action) {
            case "on":
                value = true;
                break;
            case "off":
                value = false;
        }
        console.log(value);
        return value;
    };

    return lightData;
});
