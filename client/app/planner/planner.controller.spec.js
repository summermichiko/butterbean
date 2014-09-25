'use strict';

describe('Controller: PlannerCtrl', function () {

  // load the controller's module
  beforeEach(module('tripplannerAngularApp'));

  var PlannerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlannerCtrl = $controller('PlannerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
