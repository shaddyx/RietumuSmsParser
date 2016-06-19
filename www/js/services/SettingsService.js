/**
 * Created by shaddy on 07.06.16.
 */
app.service("SettingsService", ["$interval", function($interval){
    var my = this;
    var SETTINGS_KEY = "rietumuParser";
    var SAVE_INTERVAL = 100;
    var settings = {};
    var defaultSettings = {
        lastWordsToStore: 100
    };
    
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
    };

    this.load();
    $interval(function(){
        my.save();
    }, SAVE_INTERVAL);
}]);