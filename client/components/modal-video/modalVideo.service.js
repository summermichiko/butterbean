'use strict';

angular.module('tripplannerAngularApp')
  .factory('ModalVideo', function ($modal, $log) {
    var ModalVideo = {
      openVideo: function(object, size, selected) {
        var modalInstance = $modal.open({
          templateUrl: 'components/modal-video/modalVideo.html',
          controller: 'VideoInstanceCtrl',
          size: size,
          resolve: {
            currentItem: function () {
              return object;
            }
          }
        });

    modalInstance.result.then(function (selectedItem) {
        selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  };

    return ModalVideo;
  });



