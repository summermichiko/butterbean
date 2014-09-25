'use strict';

angular.module('tripplannerAngularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('planner', {
        url: '/planner',
        templateUrl: 'app/planner/planner.html',
        controller: 'PlannerCtrl'
      });
  });