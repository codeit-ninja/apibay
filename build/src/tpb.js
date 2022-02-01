"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPB_Api = void 0;
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const RequestExceptions_1 = require("./exceptions/RequestExceptions");
class TPB_Api {
    constructor() {
        axios_1.default.defaults.baseURL = 'https://apibay.org';
        axios_1.default.defaults.responseType = 'json';
    }
    search(params) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.request('/q.php', params);
        });
    }
    details(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.request('/t.php', { id: id });
        });
    }
    top100(category) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.request(`/precompiled/data_top100_${category}.json`);
        });
    }
    recent() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.top100('recent');
        });
    }
    byUser(username, page = 0) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.request('/q.php', { q: `user:${username}:${page}` });
        });
    }
    setBaseUrl(url) {
        axios_1.default.defaults.baseURL = url;
    }
    request(path, params) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const request = yield axios_1.default.get(path, { params: params });
                return request.data;
            }
            catch (err) {
                if (axios_1.default.isAxiosError(err)) {
                    throw new RequestExceptions_1.default(err.message);
                }
                throw new Error('Something wen\'t');
            }
        });
    }
}
exports.TPB_Api = TPB_Api;
//# sourceMappingURL=tpb.js.map