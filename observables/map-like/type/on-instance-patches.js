var QUnit = require("steal-qunit");
var canSymbol = require("can-symbol");
var canReflect = require("can-reflect");

module.exports = function(name, Type) {

    QUnit.test(name+" canReflect.onInstancePatches", function(){


        canReflect.defineInstanceKey(Type, "first", {});
        canReflect.defineInstanceKey(Type, "last", {});


        var calls = [];
        function handler(obj, patches) {
            calls.push([obj, patches]);
        }

        Type[canSymbol.for("can.onInstancePatches")](handler);

        var instance = new Type({first: "Justin", last: "Meyer"});

        canReflect.setKeyValue(instance, "first", "Payal");
        canReflect.setKeyValue(instance, "last", "Shah");
        canReflect.setKeyValue(instance, "middle", "p");

        Type[canSymbol.for("can.offInstancePatches")](handler);

        canReflect.setKeyValue(instance, "first", "Ramiya");
        canReflect.setKeyValue(instance, "last", "Mayer");
        canReflect.setKeyValue(instance, "middle", "P");

        QUnit.deepEqual(calls,[
            [instance,  [{type: "set",    key: "first", value: "Payal"} ] ],
            [instance, [{type: "set",    key: "last", value: "Shah"} ] ],
            [instance, [{type: "set",    key: "middle", value: "p"} ] ]
        ]);
    });

};
