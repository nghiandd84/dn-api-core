"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBIT_EXCHANGE_TYPE = exports.RABBIT_CONFIG_TOKEN = exports.RABBIT_HANDLER = void 0;
exports.RABBIT_HANDLER = Symbol('RABBIT_HANDLER');
exports.RABBIT_CONFIG_TOKEN = Symbol('RABBIT_CONFIG');
var RABBIT_EXCHANGE_TYPE;
(function (RABBIT_EXCHANGE_TYPE) {
    RABBIT_EXCHANGE_TYPE["DIRECT"] = "direct";
    RABBIT_EXCHANGE_TYPE["FANOUT"] = "fanout";
    RABBIT_EXCHANGE_TYPE["TOPIC"] = "topic";
    RABBIT_EXCHANGE_TYPE["HEADER"] = "headers";
})(RABBIT_EXCHANGE_TYPE = exports.RABBIT_EXCHANGE_TYPE || (exports.RABBIT_EXCHANGE_TYPE = {}));
//# sourceMappingURL=rabbitmq.constants.js.map