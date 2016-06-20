/**
 * Created by shaddy on 26.05.16.
 */

app.controller("SettingsController", ["$scope", "SettingsService", function($scope, SettingsService){
    debugger;
    /**
     *
     * @type {{showLocations:boolean}}
     */
    $scope.settings = SettingsService.load();
}]);