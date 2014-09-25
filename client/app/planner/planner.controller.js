'use strict';

angular.module('tripplannerAngularApp')
  .controller('PlannerCtrl', function ($scope, $http, User, $location, $anchorScroll) {

    // var fixedMainMenu = $(".main").offset().top;
    // var fixedMenu = function() {
    //   var scrollTop = $(window).scrollTop();
    //   if (scrollTop > fixedMainMenu) {
    //       $(".main").addClass("fixed");
    //     } else {
    //       $(".main").removeClass("fixed");
    //     }
    //   };

    //   $(window).scroll(function() {
    //     fixedMenu();
    // });

    // $('.selectpicker').selectpicker();
    // $('.selectpicker').selectpicker({
    //   font-family: Amatic SC,
    //   font-size: 30px;
    // });

    $scope.gotoTop = function() {
      $location.hash('top');
      $anchorScroll();
    };

    $scope.users = User.query();

    $scope.show = {
    	schools: true,
    	foods: false,
      actives: false,
    	enrichments: false,
    	cultures: false,
    	extras: false
    };

  	$scope.data = {
    	schools: [],
    	foods: [],
      actives: [],
    	enrichments: [],
    	cultures: [],
    	healths: []
    };

    $scope.active = {
      schools: true,
      foods: false,
      actives: false,
      enrichments: false,
      cultures: false,
      extras: false
    };

    $scope.addActive = function(itemToShow) {
      // for (var property in $scope.active) {
      //   $scope.active[property].removeClass('active');
      // }
      // $scope.active[itemToShow].addClass('active');
      console.log($scope.active);
    }

    $scope.showItems = function(itemToShow) {
      for (var property in $scope.show) {
      	$scope.show[property] = false;
      }
      $scope.show[itemToShow] = true;
    };

    $http({ method: 'GET', url: '/api/items'}).
    success(function(items, status, headers, config) {

      for (var i = 0; i < items.length; i++) {
        // console.log($scope.data[items[i].category]);
        $scope.data[items[i].category].push(items[i]);
      };
    });

  });


