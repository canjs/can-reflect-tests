var QUnit = require("steal-qunit");
var canSymbol = require("can-symbol");
var canReflect = require("can-reflect");

module.exports = function(name, makeType) {

    QUnit.test(name+" canReflect.onInstanceBoundChange", function(){
        var Type = makeType();
        canReflect.defineInstanceKey(Type, "prop", {});

        var calls = [];
        function handler(obj, patches) {
            calls.push([obj, patches]);
        }

        Type[canSymbol.for("can.onInstanceBoundChange")](handler);

        var instance = new Type({prop: "value"});
        var bindHandler = function(){};
        instance.on("prop", bindHandler);
        instance.off("prop", bindHandler);

        Type[canSymbol.for("can.offInstanceBoundChange")](handler);
        instance.on("prop", bindHandler);
        instance.off("prop", bindHandler);

        QUnit.deepEqual(calls,[
            [instance,  true ],
            [instance, false ]
        ]);
    });

};
