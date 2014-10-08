'use strict';

angular.module('tripplannerAngularApp')
  .controller('AddItemInstanceCtrl', function ($scope, $modalInstance, $http) {
      $scope.ok = function () {
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.formObj = {
        name: "",
        yelpName: "",
        image: "",
        category: "",
        address: "",
        website: "",
        gradeLevels: "",
        enrollment: "",
        boarding: "",
        gender: "",
        religion: "",
        town: "",
        student: "",
        city: "",
        writeUp: "",
        logo: ""
      };

      //post call here
      $scope.addItem = function() {
        console.log($scope.formObj);

        // var townArr = ;
        // $scope.formObj.town = townArr;

        //==================================
        // var newObj = {
        //   name: $scope.formObj.name,
        //   town: $scope.formObj.town.split(",")
        // };



        //===================================

        $http.post("/api/items", $scope.formObj).success(function(data) {
          $modalInstance.close();
        });
      };

    });














