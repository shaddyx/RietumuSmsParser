/**
 * Created by shaddy on 26.05.16.
 */

app.controller("RietumuSmsParserMainController", ["$scope", "SmsService", "$interval", "RietumuService", "$rootScope",
    function($scope, SmsService, $interval, RietumuService, $rootScope){
    $scope.smsList = SmsService.getSmsList();
    $scope.refresh = function(){
        console.log("refreshing");
        RietumuService.process().then(function(balances){
            console.log("Balance receiving");
            $scope.balances = balances;
        }).catch(function(e){
            $scope.error = e;
        });
    };

    $scope.refresh();
    $rootScope.$on("smsArrive", function (){
        $scope.refresh();
    });

}]);