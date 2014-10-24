'use strict';

angular.module('tripplannerAngularApp')
  .controller('IndividualtemplateCtrl', function ($scope, $stateParams, $http, $modal, $log, Auth) {
    var itemId = $stateParams.itemId;
    var category = $stateParams.category;

    $scope.getUrl = function(item) {
      return {
        schools: 'individualTemplate/schools/' + item._id,
        foods: 'individualTemplate/foods/' + item._id,
        actives: 'individualTemplate/actives/' + item._id,
        enrichments: 'individualTemplate/enrichments/' + item._id,
        cultures: 'individualTemplate/cultures/' + item._id,
        extras: 'individualTemplate/extras/' + item._id
      }[category]
    };

    $scope.isAdmin = Auth.isAdmin;
    $scope.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
      zoom: 15,
      control: {}
    };

    $scope.marker = {
            id:0,
            coords: {
                latitude: 0,
        		longitude: 0
            }
        };

    $http.get('/api/items/').success(function(allItems) {
      $scope.allItems = allItems;
      console.log($scope.allItems);
      var filteredItems = [];

      for(var i=0; i<allItems.length; i++) {
        if(allItems[i].category == category && allItems[i]._id !== itemId) {
          filteredItems.push(allItems[i]);
        }
      }
      console.log(filteredItems);

      var lower_bound = 0;
      var upper_bound = filteredItems.length-1;
      var unique_random_numbers = [];

      $scope.random = function() {
          while(unique_random_numbers.length < 3) {
            var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
              if (unique_random_numbers.indexOf(random_number) == -1) {
                unique_random_numbers.push(random_number);
              }
          }
          var randomItemArray = [];
          for(var i = 0; i < unique_random_numbers.length; i++) {
            randomItemArray.push(filteredItems[unique_random_numbers[i]]);
          }
          console.log(randomItemArray);
          return randomItemArray;
      }();

    });

    $http.get('/api/items/' + itemId).success(function(allData) {
    	var geocoder = new google.maps.Geocoder();

    	$scope.object = allData;

	    var codeAddress = function() {
	    	var address = allData.dataFromDatabase.address;

	    	geocoder.geocode({ 'address': address }, function(results, status) {
	    		// console.log(results);
	    		$scope.map.control.getGMap().setZoom(15);
    			$scope.map.control.refresh({latitude: results[0].geometry.location.k, longitude: results[0].geometry.location.B});
    			$scope.marker = {
	    			id: 0,
	    			coords: {
	    				latitude: results[0].geometry.location.k,
	    				longitude: results[0].geometry.location.B
	    			}
	    		};
	    	});
	    };
	    codeAddress();
    });

    $scope.openEdit = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'editItem.html',
        controller: 'EditItemInstanceCtrl',
        size: size,
        resolve: {
          formFiller: function () {
            return $scope.object;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openVideo = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'videoCtrl.html',
        controller: 'VideoInstanceCtrl',
        size: size,
        resolve: {
          currentItem: function () {
            return $scope.object;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }); //closing IndividualTemplateCtrl

//BOOKMARK MODAL
var BookmarkModalCtrl = /*@ngInject*/ function ($scope, $modal, $log, Auth, $stateParams) {
  $scope.userId = Auth.getCurrentUser()._id;
  $scope.itemId = $stateParams.itemId

  console.log("this is userid from bookmarkmodalctrl: ", $scope.userId);
  $scope.open = function (templateUrl) {
    var modalInstance = $modal.open({
      templateUrl: 'bookmarkContent.html',
      controller: 'BookmarkModalInstanceCtrl',
      resolve: {
        currentUserId: function() {
          return $scope.userId;
        },
        currentItemId: function() {
          return $scope.itemId;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};
var BookmarkModalInstanceCtrl = /*@ngInject*/ function ($scope, $modalInstance, currentUserId, currentItemId, $http, Auth) {
  var userId = Auth.getCurrentUser()._id;
  // console.log("this is userid from bookmarkmodalinstane: ", userId);
  $scope.name = "";
  $scope.selected = {
    item: $scope.name
  };
  $scope.ok = function () {
    // $http.get("/api/items/" + currentItemId).success(function(resultObj) {
      $http.put("/api/users/" + userId + "/addbookmark", {itemId: currentItemId}).success(function() {
        $modalInstance.close($scope.selected.item);
      });
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

var EditItemInstanceCtrl = /*@ngInject*/ function ($scope, $modalInstance, $http, formFiller) {
  $scope.formFiller = formFiller;
  console.log($scope.formFiller);

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.editItem = function() {
    $http.put('/api/items/' + $scope.formFiller.dataFromDatabase._id, $scope.formFiller.dataFromDatabase).success(function() {
      $modalInstance.close();
    });
  };
};

var VideoInstanceCtrl = /*@ngInject*/ function ($scope, $modalInstance, currentItem) {
  console.log("this is the current item", currentItem);
  $scope.currentItem = currentItem;
  $scope.ok = function () {
    // $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


var DoneModalCtrl = /*@ngInject*/ function ($scope, $modal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function (templateUrl) {
    var modalInstance = $modal.open({
      templateUrl: 'doneContent.html',
      controller: 'DoneModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

var DoneModalInstanceCtrl = /*@ngInject*/ function ($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};









