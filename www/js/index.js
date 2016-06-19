var app = angular.module('ionicApp', ['ionic']);
document.addEventListener("deviceready", function(){
    console.log("Device is ready, initializing angular");
    angular.bootstrap(document, ["ionicApp"]);
}, false);
