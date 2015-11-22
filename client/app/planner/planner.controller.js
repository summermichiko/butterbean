'use strict';

angular.module('tripplannerAngularApp')
  .factory('Planner', function($http) {
    // factories get run on site load
    var Planner = {
      show: {
        schools: true,
        foods: false,
        actives: false,
        enrichments: false,
        cultures: false,
        extras: false
      },
      getUrl: function(category, item) {
        return {
          schools: 'individualTemplate/schools/' + item._id,
          foods: 'individualTemplate/foods/' + item._id,
          actives: 'individualTemplate/actives/' + item._id,
          enrichments: 'individualTemplate/enrichments/' + item._id,
          cultures: 'individualTemplate/cultures/' + item._id,
          extras: 'individualTemplate/extras/' + item._id
        }[category]
      },
      showItems: function(itemToShow) {
        for (var property in this.show) {
          // "this" refers to var Planner (what is calling showItems function)
           this.show[property] = false;
          }
        this.show[itemToShow] = true;
      },
      data: {
        schools: [],
        foods: [],
        actives: [],
        enrichments: [],
        cultures: [],
        healths: []
      },
      fillData: function() {
        var self = this;
        $http({ method: 'GET', url: '/api/items'}).
        success(function(items) {
          for (var i = 0; i < items.length; i++) {
            self.data[items[i].category].push(items[i]);
            // use "Planner" here instead of "this" because this http request is outside of the Planner factory
          };
        });
      }
    };
      // end of factory, returns the Planner object
    return Planner;
  })
  .controller('PlannerCtrl', function ($scope, $http, User, $location, $anchorScroll, Planner) {
    // controllers get run when associated html file is in use
    $scope.gotoTop = function() {
      $location.hash('top');
      $anchorScroll();
    };
    $scope.fillData = Planner.fillData();
    $scope.show = Planner.show;
    $scope.getUrl = Planner.getUrl;
    $scope.showItems = Planner.showItems;
    $scope.data = Planner.data;
 });

 // $scope.data = {
    //   schools: [],
    //   foods: [],
    //   actives: [],
    //   enrichments: [],
    //   cultures: [],
    //   healths: []
    // };

    // $http({ method: 'GET', url: '/api/items'}).
    // success(function(items) {
    //   for (var i = 0; i < items.length; i++) {
    //     $scope.data[items[i].category].push(items[i]);
    //   };
    // });

    // $scope.show = {
    // 	schools: true,
    // 	foods: false,
    //   actives: false,
    // 	enrichments: false,
    // 	cultures: false,
    // 	extras: false
    // };

    // $scope.getUrl = function(category, item) {
    //   return {
    //     schools: 'individualTemplate/schools/' + item._id,
    //     foods: 'individualTemplate/foods/' + item._id,
    //     actives: 'individualTemplate/actives/' + item._id,
    //     enrichments: 'individualTemplate/enrichments/' + item._id,
    //     cultures: 'individualTemplate/cultures/' + item._id,
    //     extras: 'individualTemplate/extras/' + item._id
    //   }[category]

      // same as multiple if statements
      // if (category === 'schools') {
      //   return 'individualTemplate/schools/' + item._id
      // }
    // };

    // for object, syntax is Object[Key]
    // or Object.Key

    // var x = { "a": 1, "b": 2 };
    // var y = x["b"];

    // for array, syntax is Array[Index]
    // var m = [1, 2, 3, 4];
    // var n = [1, 2, 3, 4][0];

    // $scope.showItems = function(itemToShow) {
    //   for (var property in $scope.show) {
    //   	$scope.show[property] = false;
    //   }
    //   $scope.show[itemToShow] = true;
    // };



