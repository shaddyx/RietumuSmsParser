/**
 * Created by shaddy on 12.06.16.
 */
var dbgConsole = {
    styles:{
        position:"absolute",
        left: 0,
        top: 0,
        backgroundColor:"#ffe6ee",
        zIndex:100000000
    },
    applyStyles:function(styles){
        for (var k in styles){
            this._element.style[k] = styles[k];
        }
    },
    show:function(){
        if (!this._element){
            this._element = document.createElement("div");
            this.applyStyles(this.styles);
            document.body.appendChild(this._element);
        }
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;

        this._element.style.display = "block";
        this._element.style.width = x + "px";
        this._element.style.height = y + "px";
    },
    add:function(text){
        var err = document.createElement("div");
        err.innerHTML = text;
        this.show();
        this._element.appendChild(err);
    }

};
dbgConsole.oldOnError = window.onerror;
window.onerror = function(message, url, lineNumber) {
    console.log("Error: " + message + " in " + url + " at line " + lineNumber);
    dbgConsole.add("Error: " + message + " in " + url + " at line " + lineNumber);
    //dbgConsole.oldOnError && dbgConsole.oldOnError.apply(arguments);
};
