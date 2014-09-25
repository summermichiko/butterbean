'use strict';

describe('Controller: IndividualtemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('tripplannerAngularApp'));

  var IndividualtemplateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualtemplateCtrl = $controller('IndividualtemplateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
