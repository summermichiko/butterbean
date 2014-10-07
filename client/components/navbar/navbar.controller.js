'use strict';

angular.module('tripplannerAngularApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

  var BookmarkListCtrl = /*@ngInject*/ function ($scope, $modal, $log, $stateParams) {
      var itemId = $stateParams.itemId;

      $scope.open = function (templateUrl) {

        var modalInstance = $modal.open({
          templateUrl: 'bookmarkList.html',
          controller: BookmarkListInstanceCtrl,
          resolve: {
            currentItem: function() {
              return itemId;
            }
          }
        });
        modalInstance.result.then(function () {
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    };
    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.
    var BookmarkListInstanceCtrl = /*@ngInject*/ function (Auth, $scope, $modalInstance, currentItem, $http) {
      var user = Auth.getCurrentUser();

      $scope.delete = function (bookmark, index) {
        console.log("this is the bookkmark:", bookmark);
        console.log("this is the index" , index);
        $http.put("/api/users/" + user._id + "/deletebookmark").success(function() {
          $scope.bookmarks.splice(index, 1);
        });
      };

      $scope.closeModal = function() {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $http.get("/api/users/" + user._id).success(function(results) {
        console.log(results);

      $scope.bookmarks = results;
      });
    };

    var AddItemCtrl = /*@ngInject*/ function ($scope, $modal, $log) {
      $scope.open = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'addItem.html',
          controller: AddItemInstanceCtrl,
          size: size
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    };

    var AddItemInstanceCtrl = /*@ngInject*/ function ($scope, $modalInstance, $http) {
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

    };















