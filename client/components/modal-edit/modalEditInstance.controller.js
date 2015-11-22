'use strict';

angular.module('tripplannerAngularApp')
  .controller('EditItemInstanceCtrl', function($scope, $modalInstance, $http, formFiller) {
    $scope.formFiller = formFiller;

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.editItem = function() {
      $http.put('/api/items/' + $scope.formFiller.dataFromDatabase._id, $scope.formFiller.dataFromDatabase).success(function() {
        $modalInstance.close();
      });
    };
});