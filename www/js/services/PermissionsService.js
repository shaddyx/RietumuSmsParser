/**
 * Created by shaddy on 07.06.16.
 */

app.service("PermissionsService", ["$q", function($q){
    var permissions = cordova.plugins.permissions;
    if (!permissions){
        throw new Error("Error, permissions plugin is not installed");
    }
    this.permissions = {
        READ_SMS:permissions.READ_SMS
    };
    this.hasPermission = function(perm){
        var deferred = $q.defer();
        permissions.hasPermission(perm, function(status){
            deferred.resolve(status.hasPermission);
        }, function(e){
            deferred.reject(e);
        });
        return deferred.promise;
    };

    this.requestPermission = function(perm){
        var deferred = $q.defer();
        permissions.requestPermission(perm, function(res){
            deferred.resolve(res.hasPermission);
        }, function(){
            deferred.reject();
        });
        return deferred.promise;
    }
}]);