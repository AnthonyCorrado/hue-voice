angular.module('starter.controllers', [])

.controller('SettingsCtrl', ['$scope', 'RegisterService', function($scope, RegisterService, $timeout) {

  $scope.registerUser = function(name) {
    RegisterService.register(name)
      .then(function(response) {
    });
  };

}])

.controller('LightsCtrl', function($scope, MockData, $timeout, LightingService, $http, ColorService, $rootScope) {

  var mockLightsReturn = MockData.getAllLights();
  $scope.allLights = mockLightsReturn;
  $rootScope.iconColor = 'icon-white';
  $rootScope.buttonClass = "";

  // retrieve initial state of lights
  (function() {
    LightingService.getAllLights.then(function(response) {
      if (response.status === 200) {
        var color = response.data.lights;
        $scope.allLights = color;
        var hue =  color[1].state.hue;
        var num = parseInt(hue, 10);
        var setColor = ColorService.getColorValue(num);
        var shadowObj = ColorService.setShadowColor(setColor);
        $scope.toggleColor = "track-" + setColor;
        $scope.sliderColor = "range-" + setColor;
        $scope.fontColor = "label-font-" + setColor;
        $scope.fontColor2 = "font-" + setColor;
        $rootScope.iconColor = "icon-" + setColor;
        $rootScope.buttonClass = "button-outline-" + setColor;
        $scope.shadowColor = shadowObj;
      }
      else {
        $scope.allLights = mockLightsReturn;
      }
    });
  })();

  // 
  $scope.toggleOn = function(index, obj) {
    console.log(obj.state.hue);
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
    if (param == "bri") {
        field = parseInt(obj.state.bri, 10);
        body = {"bri": field};
    }
    else if (param == "hue") {
        field = parseInt(obj.state.hue, 10);
        $rootScope.iconAnimate();
        var color = ColorService.getColorValue(field);
        var shadowObj = ColorService.setShadowColor(color);
        $scope.toggleColor = "track-" + color;
        $scope.sliderColor = "range-" + color;
        $scope.fontColor = "label-font-" + color;
        $scope.fontColor2 = "font-" + color;
        $scope.shadowColor = shadowObj;
        $rootScope.iconColor = "icon-" + color;
        $rootScope.buttonClass = "button-outline-" + color;
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
      $scope.lights = response.data.name;
    });
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('VoiceCtrl', function($scope, $timeout, VoiceService, LightingService, ThemesModel, $rootScope) {

  $scope.buttonColor = $rootScope.buttonClass;

  $scope.onVoice = function() {
    var maxMatches = 1;
    window.plugins.speechrecognizer.startRecognize(function(result){
        $scope.$apply(function () {
          $scope.voice = result[0];
          var body = VoiceService.analyze(result[0]);
          console.log(body);
          if(body.length === 2) {
            LightingService.lightAction(body[0].number , body[1])
              .then(function(response) {
            });
          }
          else if(body.length === 3) {
            var themeData = {"color1": body[0], "color2": body[1]};
            ThemesModel.themeSelect(themeData);
          }
        });
    }, maxMatches);
  };

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ThemesCtrl', function($scope, ThemesModel, LightingService, ColorService, $rootScope) {

  $scope.themes = ThemesModel.getAllThemes();
  $rootScope.iconColor = 'icon-white';


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

    ThemesModel.themeSelect(colorObj);
    
  };

});
