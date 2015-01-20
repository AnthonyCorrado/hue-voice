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

  // retrieve initial state of lights
  (function() {
    LightingService.getAllLights.then(function(response) {
      console.log(response.data.lights);
      $scope.allLights = response.data.lights;
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

.controller('ChatsCtrl', function($scope) {
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

});
