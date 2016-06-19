/**
 * Created by shaddy on 07.06.16.
 */
/** @typedef {{id: number, date:number, amount: number, currency: string, store: string, fop: string, city: string, balance: number, balanceCurrency: string}} ParsedSms*/
app.service("RietumuService", ["SmsService", function(SmsService){
    var my = this;
    //9725 -770.00UAH
    var amountRe = new RegExp("([0-9]+) ([-]*[0-9\\.]+) ([A-Z]+)");
    var balanceRe = new RegExp("Balance \\= ([-]*[0-9\\.]+) ([A-Z]+)");
    this.parse = function(){
        console.log("retrieving sms list");
        return SmsService.getSmsList()
            .then(
                /**
                 *
                 * @param list {SMS[]}
                 */
                function(list){
                var results = [];
                for (var k in list){
                    try{
                        results.push(my.parseSms(list[k]));
                    } catch (e){
                        console.log("Error parsing:", list[k], e);
                    }
                }
                return results;
            });
    };
    /**
     *
     * @param sms {SMS}
     * @returns {ParsedSms}
     */

    this.parseSms = function(sms){
        var result = {
            unknownId:0,
            amount:1,
            currency:"",
            store:"unknown",
            fop:"",
            city:"",
            balance:0,
            balanceCurrency:"",
            date:sms.date_sent
        };
        console.log("parsing:", sms);
        /** @type {string[]} */
        var lines = sms.text.split("\n");
        var index = 0;
        var matches = lines[index++].match(amountRe);
        result.unknownId = parseInt(matches[1]);
        result.amount = parseFloat(matches[2]);
        result.currency = matches[3];
        console.log("amount parsed");
        if (lines[index].indexOf(">") === -1){
            result.store = lines[index++];
            console.log("store added:", result.store);
        }
        var storeChunks = lines[index++].split(">");
        result.fop = storeChunks[0];
        result.city = storeChunks[1];
        console.log("fop, city added:", result.fop, result.city);
        console.log(lines, index, result);
        var matches = lines[index++].match(balanceRe);
        result.balance = parseFloat(matches[1]);
        result.balanceCurrency = matches[2];
        console.log("Balance parsed:", result.balance, result.balanceCurrency);
        return result;
    };
    /**
     *
     * @returns {Promise}
     */
    this.process = function(){
        return this.parse()
            .then(
                /**
                 * calculates differences
                 * @param list {ParsedSms}
                 */
                function(list){
                    for (var k in list){
                        if (k!=0){
                            list[k].difference = list[k].balance - list[k - 1].balance;
                            list[k].rate = list[k].amount / list[k].difference;
                        } else {
                            list[k].difference = 0;
                            list[k].rate = 0;
                        }
                    }
                    return list;
                }
            )
    };
}]);