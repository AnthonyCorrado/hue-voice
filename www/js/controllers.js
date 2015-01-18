angular.module('starter.controllers', [])

.controller('RegisterCtrl', ['$scope', 'RegisterService', function($scope, RegisterService, $timeout) {

  $scope.registerUser = function(name) {
    RegisterService.register(name)
      .then(function(response) {
    });
  };
}])

.controller('LightsCtrl', function($scope, MockData, $timeout) {

  var mockLightsReturn = MockData.getAllLights();
  console.log(mockLightsReturn);

  $scope.allLights = mockLightsReturn;

  $scope.effects = [
      {'name': 'None', 'value': 'none'},
      {'name':'Blink Once', 'value': 'select'},
      {'name':'Blink 30', 'value': 'lselect'}
  ];

  $scope.colorLoop = {};
  $scope.colorLoop.active = false;

  $scope.$watch("colorLoop.active", function(newValue, oldValue) {
    if ($scope.colorLoop.active) {
      console.log('on');
    }
    else console.log('off');
  });

  $scope.selectedEffect = {};
  $scope.selectedEffect.value = $scope.effects[0];
  $scope.$watch("selectedEffect.value", function(newValue, oldValue) {
    console.log($scope.selectedEffect.value.name);
  });

  // -----------

  $scope.isLightOn = true;
  // $scope.selectLight = function(index) {
  //   LightingService.selectLight(index).then(function(response) {
  //     console.log(response.data);
  //     $scope.lights = response.data.name;
  //   });
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatsCtrl', function($scope, Chats) {
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});