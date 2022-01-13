"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBITMQ_CONFIG = exports.DB_CONFIG = void 0;
var DB_CONFIG;
(function (DB_CONFIG) {
    DB_CONFIG["DB_HOST"] = "localhost";
    DB_CONFIG[DB_CONFIG["DB_PORT"] = 3306] = "DB_PORT";
    DB_CONFIG["DB_USER"] = "root";
    DB_CONFIG["DB_PASSWORD"] = "123456";
})(DB_CONFIG = exports.DB_CONFIG || (exports.DB_CONFIG = {}));
var RABBITMQ_CONFIG;
(function (RABBITMQ_CONFIG) {
    RABBITMQ_CONFIG["RABBITMQ_URL"] = "amqp://admin:admin@localhost:5672";
})(RABBITMQ_CONFIG = exports.RABBITMQ_CONFIG || (exports.RABBITMQ_CONFIG = {}));
//# sourceMappingURL=constant.js.map