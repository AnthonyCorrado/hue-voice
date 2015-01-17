angular.module('starter.controllers', [])

.controller('RegisterCtrl', ['$scope', 'RegisterService', function($scope, RegisterService) {

  $scope.registerUser = function(name) {
    RegisterService.register(name)
      .then(function(response) {
    });
  };
}])

.controller('LightsCtrl', function($scope, MockData) {

  var mockLightsReturn = MockData.getAllLights();
  console.log(mockLightsReturn);

  $scope.allLights = mockLightsReturn;

  // ---------

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
