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
            image: "/assets/images/baker.jpg",
            text: "Kelly Shigeta",
            description: "Head Baker at Great Harvest Bread Company"
        }, {
            image: "/assets/images/skydiver.jpg",
            text: "Danny Cosson",
            description: "Senior skydiver at Skydive Hawaii"
        }, {
            image: "/assets/images/danceteacher.jpg",
            text: "George Monroe",
            description: "Advanced ballet teacher at Pas De Deux"
        }];


  });
