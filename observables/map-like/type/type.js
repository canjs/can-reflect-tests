var defineInstanceKey = require("./define-instance-key");
var onInstanceBoundChange = require("./on-instance-bound-change");
var onInstanceBatches = require("./on-instance-bound-patches");

module.exports = function(name, makeType) {
    defineInstanceKey(name, makeType);
    onInstanceBoundChange(name, makeType);
    onInstanceBatches(name, makeType);
};
