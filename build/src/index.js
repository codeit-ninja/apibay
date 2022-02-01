"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tpb_1 = require("./tpb");
(0, tslib_1.__exportStar)(require("./categories"), exports);
(0, tslib_1.__exportStar)(require("./tpb"), exports);
(0, tslib_1.__exportStar)(require("./types"), exports);
const TPBApi = new tpb_1.TPB_Api();
exports.default = TPBApi;
//# sourceMappingURL=index.js.map