angular.module('starter.controllers', [])

.controller('RegisterCtrl', ['$scope', 'RegisterService', function($scope, RegisterService, $timeout) {

  $scope.registerUser = function(name) {
    RegisterService.register(name)
      .then(function(response) {
    });
  };

}])

.controller('LightsCtrl', function($scope, MockData, $timeout, LightingService, $http) {


  var mockLightsReturn = MockData.getAllLights();
  $scope.allLights = mockLightsReturn;

  // retrieve initial state of lights
  (function() {
    LightingService.getAllLights.then(function(response) {
      console.log(response.status);
      if (response.status === 200) {
        $scope.allLights = response.data.lights;
      }
      else {
        $scope.allLights = mockLightsReturn;
      }
    });
  })();

  // 
  $scope.toggleOn = function(index, obj) {
    console.log(obj.state.on);
    var bool = obj.state.on;
    body = {"on": bool};
    LightingService.lightAction(index, body)
        .then(function(response) {
    });
    bool = !bool;
  };

  // updates light settings of targed slider after debounce value
  $scope.adjustSlider = function(index, obj, param) {
    var field;
    console.log(obj.state.bri);
    if (param == "bri") {
        field = parseInt(obj.state.bri, 10);
        body = {"bri": field};
    }
    else if (param == "hue") {
        field = parseInt(obj.state.hue, 10);
        body = {"hue": field};
    }
    else {
        field = parseInt(obj.state.sat, 10);
        body = {"sat": field};
    }
    LightingService.lightAction(index, body)
        .then(function(response) {
    });
  };

  $scope.toggleLoop = function(index, param) {
    var effect;
    if (!param) {
        effect = "none";
    }
    else {
        effect = "colorloop";
    }
    body = {"effect": effect};
    LightingService.lightAction(index, body)
        .then(function(response) {
    });
  };

  $scope.effects = [
      {'name': 'None', 'value': 'none'},
      {'name':'Blink Once', 'value': 'select'},
      {'name':'Blink 30', 'value': 'lselect'}
  ];

  $scope.effectSelect = function(index, effect) {
    body = {"alert": effect.value};
    LightingService.lightAction(index, body)
        .then(function(response) {
    });
  };
  $scope.selectedEffect = {};
  $scope.selectedEffect.value = $scope.effects[0];

  // -----------

  $scope.isLightOn = true;
  $scope.selectLight = function(index) {
    LightingService.selectLight(index).then(function(response) {
      console.log(response.data);
      $scope.lights = response.data.name;
    });
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('VoiceCtrl', function($scope, $timeout, VoiceService, LightingService) {

  $scope.onVoice = function() {
      command = $scope.voice;
      console.log(command);
      var body = VoiceService.analyze(command);
      console.log(body[0].number);
      LightingService.lightAction(body[0].number , body[1])
        .then(function(response) {
      });
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ThemesCtrl', function($scope, ThemesModel, LightingService, ColorService) {

  $scope.themes = ThemesModel;

  $scope.colorOne = function(color1, color2) {
    return {
      'border-left': ('2px solid ' + color1),
      'border-top': ('2px solid ' + color1),
      'border-right': ('2px solid ' + color2),
      'border-bottom': ('2px solid ' + color2),
      'color': color1
    };
  };

  $scope.themeSelect = function(colorObj) {
    var col1, col2;
    col1 = ColorService.getHueValue(colorObj.color1);
    col2 = ColorService.getHueValue(colorObj.color2);
    var body = [{"hue": col1}, {"hue": col2}];
    for (i=1; i<3; i++) {
      LightingService.lightAction(i , body[i-1]);
    }
  };

});
