/**
 * Created by shaddy on 07.06.16.
 */
/** @typedef {{id:number, date:number, date_sent:number, text: string, from: string}} SMS */
app.service("SmsService", ["$rootScope", "$q", function($rootScope, $q){
    var browser = device.platform === "browser";
    if (! SMS ) { alert( 'SMS plugin not ready' ); return; }
    /** @type {{text:string, from:string}[]} */
    var list = [];
    /**
     * test utility, runs only in browser mode
     * @param amount
     * @param balance
     */
    var fakeSms = function(amount, balance){
        this.counter = this.counter || 0;
        var date = this.counter++;
        list.push({
            text: " 9256 " + amount + " UAH\n3A GRISHKA STR>KIEV UA\nBalance = " + balance + " USD",
            date_sent: date,
            read:1
        });
    };
    if (browser){
        //
        //  add some fake data if runned on browser
        //  only for testing
        //
        fakeSms(500000, 10000);
        fakeSms(-1000, 1000);
        fakeSms(-20000, 900);
        fakeSms(-10000, 800);
        fakeSms(-10000, 700);
        for (var k in list){
            console.log(list[k].text);
        }
        //console.log(JSON.stringify(list, null, 4));
    }

    /**
     * returns current sms list
     * @returns {Promise}
     */
    this.getSmsList = function(){
        var deferred = $q.defer();
        if (!browser){
            console.log("Getting real sms list");
            SMS.listSMS(filter, function(data){
                console.log("list received");
                list = [];
                for (var k = data.length - 1; k >= 0; k --){
                    var sms = data[k];
                    console.log("Incoming sms:", sms);
                    list.push({
                        read:sms.read,
                        id:sms._id,
                        date:sms.date,
                        date_sent:sms.date_sent,
                        from:sms.address.trim(),
                        text:sms.body.trim()
                    });
                }
                deferred.resolve(list);
            },function(error){
                console.error("Error receiving sms", error);
                deferred.reject(error);
            });
        } else {
            deferred.resolve(list);
        }
        return deferred.promise;
    };

    var filter = {
        box : 'inbox',
        indexFrom:0 ,
        maxCount:100000,
        address : "iR-sms"
    };

    document.addEventListener('onSMSArrive', function(){
        $rootScope.$broadcast("smsArrive");
    });

}]);