var QUnit = require("steal-qunit");
var canSymbol = require("can-symbol");
var canReflect = require("can-reflect");

module.exports = function(name, makeType) {

    QUnit.test(name+" canReflect.defineInstanceKey", function(){
        var Type = makeType();
    	Type[canSymbol.for("can.defineInstanceKey")]("prop", {});

    	Type[canSymbol.for("can.defineInstanceKey")]("nonEnum", {enumerable: false, value: 0});

    	var t = new Type();
        QUnit.equal(canReflect.getKeyValue(t,"nonEnum"), 0, "default value used");

        canReflect.setKeyValue(t,"prop","5");
    	t.prop = "5";
    	QUnit.equal(t.prop, "5", "value set");
    	QUnit.deepEqual( canReflect.serialize(t), {prop: "5"}, "enumerable respected");
    });

};
