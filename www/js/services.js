angular.module('starter.services', [])

.factory('RegisterService', ['$http', function($http) {
  var userInfo = {};
  var url = X;

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

.factory('LightingService', ['$http', function($http) {
  var lightingData = {};
  var username = X;
  var url = X + username + '/lights';

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
    var lightData = $http.get(url + "/" + index);
    lightData.then(function(response) {
      return response.data.state;
    });
    return lightData;
  };

  return lightingData;
}])



.factory('MockData', function() {
  var allLightData = {};

  allLightData.getAllLights = function() {
    return {

      "1": {
          "state": {
              "on": true,
              "bri": 144,
              "hue": 13088,
              "sat": 212,
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
})








.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
