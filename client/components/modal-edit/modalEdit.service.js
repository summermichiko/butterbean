'use strict';

angular.module('tripplannerAngularApp')
  .factory('ModalEdit', function ($modal, $log) {
    var ModalEdit = {
      open: function(object, selected) {
        var modalInstance = $modal.open({
          templateUrl: 'components/modal-edit/modalEdit.html',
          controller: 'EditItemInstanceCtrl',
          resolve: {
            formFiller: function() {
              return object;
            }
          }
        });

        modalInstance.result.then(function(selectedItem) {
          selected = selectedItem;
        }, function() {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }
    };

    return ModalEdit;
  });
