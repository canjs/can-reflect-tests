var QUnit = require("steal-qunit");
var canSymbol = require("can-symbol");
var canReflect = require("can-reflect");

module.exports = function(name, makeList, makeMap) {

    QUnit.test(name+" canReflect.serialize", function(){
        var map1 = makeMap({id: 1}),
            map2 = makeMap({id: 2});
        var list = makeList( [map1, map2] );

        var serialized = canReflect.serialize(list);
        QUnit.deepEqual(serialized, [
            {id: 1}, {id: 2}
        ]);

        QUnit.ok( serialized !== list, "not a list");

        QUnit.ok( map1 !== serialized[0], "not map");
        QUnit.ok( map2 !== serialized[1], "not map");
    });

};
