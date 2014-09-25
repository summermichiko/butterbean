'use strict';

angular.module('tripplannerAngularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('individualTemplate', {
        url: '/individualTemplate/:category/:itemId',
        templateUrl: 'app/individualTemplate/individualTemplate.html',
        controller: 'IndividualtemplateCtrl'
      });
  });