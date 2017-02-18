"use strict";
var di = require("akala-corere");
di.injectWithName(['$master'], function (master) {
    master(module.filename, './master', './master');
})();

//# sourceMappingURL=index.js.map
