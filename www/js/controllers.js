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
  console.log(VoiceService.analyze('hello world'));

  $scope.onVoice = function() {
      var command = document.getElementById("speechResults").value;
      var body = VoiceService.analyze(command);
      console.log(body);
      LightingService.lightAction(1 , body)
        .then(function(response) {
      });
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ThemesCtrl', function($scope, ThemesModel, LightingService) {

  (function() {
    $scope.themes = ThemesModel;
    console.log($scope.themes.length);
    var obj = $scope.themes;
    var i,x;
    console.log(obj.length);
    for (i=0; i<obj.length; i++) {
      console.log(obj[i].color1);
    }
  })();

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
    console.log(colorObj.color1);
    var col1, col2;
    if(colorObj.color1 == "purple") {
      col1 = 48000;
    }
    else if(colorObj.color1 == "green") {
      col1 = 25500;
    }
    else if(colorObj.color1 == "blue") {
      col1 = 46800;
    }
    body1 = {
      "hue": col1
    };
    LightingService.lightAction(1 , body1)
      .then(function(response) {
    });
    if(colorObj.color2 == "yellow") {
      col2 = 16500;
    }
    else if(colorObj.color2 == "silver") {
      col2 = 34000;
    }
    else if(colorObj.color2 == "green") {
      col2 = 31000;
    }
    body2 = {
      "hue": col2
    };
    LightingService.lightAction(2 , body2)
      .then(function(response) {
    });
  };

});
