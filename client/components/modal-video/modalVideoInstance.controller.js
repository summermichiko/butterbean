'use strict';

angular.module('tripplannerAngularApp')
  .controller('VideoInstanceCtrl', function($scope, $modalInstance, currentItem) {
    $scope.currentItem = currentItem;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

});