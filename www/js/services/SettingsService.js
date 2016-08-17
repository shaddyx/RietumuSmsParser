/**
 * Created by shaddy on 07.06.16.
 */
app.service("SettingsService", ["$interval", function($interval){
    var my = this;
    var SETTINGS_KEY = "applicationSettings";
    var SAVE_INTERVAL = 100;
    var settings = {};
    var defaultSettings = {};
    
    this.getSettings = function(){
        return settings;
    };

    this.save = function(){
        if (window.localStorage){
            window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        }
    };

    this.load = function(){
        if (window.localStorage && window.localStorage.getItem(SETTINGS_KEY)){
            settings = JSON.parse(window.localStorage.getItem(SETTINGS_KEY));
        } else {
            settings = defaultSettings;
        }
        return settings;
    };

    this.load();
    $interval(function(){
        my.save();
    }, SAVE_INTERVAL);
}]);