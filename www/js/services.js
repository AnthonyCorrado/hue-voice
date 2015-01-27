angular.module('starter.services', [])

.factory('RegisterService', ['$http', '$rootScope', function($http, $rootScope) {
  var userInfo = {};
  var url = $rootScope.URL_HUE;

  userInfo.register = (function(username) {
    var body = {
      "devicetype": "hue_voice#iphone anthony",
      "username": username
    };
    var data = $http.post(url, body);
    data.then(function(response) {
      console.log(response);
    });
    return data;
  })();

  return userInfo;
}])

.factory('LightingService', ['$http', '$rootScope', function($http, $rootScope) {
  var lightingData = {};
  var username = $rootScope.USERNAME_HUE;
  var url = $rootScope.URL_HUE + '/' + username;

  // get all lights available
  lightingData.getAllLights = (function() {
    var lightData = $http.get(url);
    lightData.then(function(response) {
      console.log(response);
    });
    return lightData;
  })();

  // select a single light in the group
  lightingData.selectLight = function(index) {
    var lightData = $http.get(url + '/lights' + "/" + index);
    lightData.then(function(response) {
      return response.data.state;
    });
    return lightData;
  };

  // sends action object to Hue API
  lightingData.lightAction = function(light_id, dataObj) {
    var res = url + '/lights' + '/' + light_id + '/state';
    console.log(dataObj);
    return $http.put(res, dataObj).success(function(data, status, headers) {
      console.log(data);
    });
  };

  return lightingData;
}])


.factory('GroupService', function($http, $rootScope) {
  var groupData = {};
  var username = $rootScope.USERNAME_HUE;
  var url = $rootScope.URL_HUE + '/' + username + '/groups/';

  groupData.getMainGroup = (function() {
    return $http.get(url + "0");
  })();

  return groupData;
})

.factory('VoiceService', function(ColorService) {
  var voiceData = {};
  var lightKeys = ['one', 'two'];
  var colorKeys = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'normal'];
  voiceData.analyze = function(command) {
    var i,x;
    var colorName;
    var lightName;

    // checks for available light to change
    var wordArray = command.split(" ");
    for(i=0; i<wordArray.length; i++) {

      for (x=0; x<lightKeys.length; x++) {
        if (wordArray[i] === lightKeys[x]) {
          lightName = lightKeys[x];
        }
      }
    }

    // checks for color/hue
    wordArray = command.split(" ");
    for(i=0; i<wordArray.length; i++) {

      for (x=0; x<colorKeys.length; x++) {
        if (wordArray[i] === colorKeys[x]) {
           colorName = colorKeys[x];
        }
      }
    }

    console.log(lightName);
    console.log(colorName);
    var hueNumber = ColorService.getHueValue(colorName);
    wordArray = [{"number": 1},{"hue": hueNumber}];

    return wordArray;
  };
  return voiceData;
})

.factory('MockData', function() {
  var allLightData = {};

  allLightData.getAllLights = function() {
    return {

      "1": {
          "state": {
              "on": false,
              "bri": 1,
              "hue": 0,
              "sat": 0,
              "xy": [0.5128,0.4147],
              "ct": 467,
              "alert": "none",
              "effect": "none",
              "colormode": "xy",
              "reachable": true
          },
          "type": "Extended color light",
          "name": "Hue Lamp 1",
          "modelid": "LCT001",
          "swversion": "66009461",
          "pointsymbol": {
              "1": "none",
              "2": "none",
              "3": "none",
              "4": "none",
              "5": "none",
              "6": "none",
              "7": "none",
              "8": "none"
          }
      },
      "2": {
          "state": {
              "on": false,
              "bri": 0,
              "hue": 0,
              "sat": 0,
              "xy": [0,0],
              "ct": 0,
              "alert": "none",
              "effect": "none",
              "colormode": "hs",
              "reachable": true
          },
          "type": "Extended color light",
          "name": "Hue Lamp 2",
          "modelid": "LCT001",
          "swversion": "66009461",
          "pointsymbol": {
              "1": "none",
              "2": "none",
              "3": "none",
              "4": "none",
              "5": "none",
              "6": "none",
              "7": "none",
              "8": "none"
          }
        }
    };

  };
  return allLightData;
});