'use strict';

angular.module('tripplannerAngularApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
    
        $scope.myInterval = 5000;
        var slides = $scope.slides = [{
            image: "../assets/images/wna.jpg",
            text: "Test"
        }, {
            image: "../assets/images/greatharvest.jpg",
            text: "Test"
        }, {
            image: "../assets/images/wetnwild.jpg",
            text: "Teest"
        }];
   

  });
