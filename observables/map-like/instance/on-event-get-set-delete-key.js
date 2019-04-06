var QUnit = require("steal-qunit");
var canReflect = require("can-reflect");

module.exports = function(name, makeInstance) {

    QUnit.test(name+" onEvent, setKeyValue, getKeyValue, deleteKeyValue, getOwnKeys", function(){
        var instance = makeInstance();

        var events = [];
        QUnit.notOk( canReflect.isBound(instance), "not bound");
        canReflect.onEvent(instance,"prop",function(event){
            events.push(event);
        });

        QUnit.ok( canReflect.isBound(instance), "bound");

        canReflect.setKeyValue(instance,"prop", "FIRST");
        canReflect.getOwnKeys(instance,["prop"], ".getOwnKeys has set prop");

        QUnit.equal( canReflect.getKeyValue(instance,"prop"), "FIRST", ".getKeyValue");

        canReflect.deleteKeyValue(instance,"prop");

        QUnit.equal( canReflect.getKeyValue(instance,"prop"), undefined, ".deleteKeyValue made it undefined");

        QUnit.deepEqual(
			events.map(function(event){
				return {
					action: event.action,
					newValue: event.newValue,
					oldValue: event.oldValue,
					key: event.key,
					target: instance
				};
			}),
			[
				{action: "add", newValue: "FIRST", oldValue: undefined, key: "prop", target: instance},
				{action: "delete", newValue: undefined, oldValue: "FIRST", key: "prop", target: instance}
			],
			"onEvent");

        QUnit.deepEqual( canReflect.getOwnEnumerableKeys(instance) , [], ".getOwnKeys loses deleted prop");
    });

};
