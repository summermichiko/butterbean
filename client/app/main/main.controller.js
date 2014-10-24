'use strict';

angular.module('tripplannerAngularApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
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
