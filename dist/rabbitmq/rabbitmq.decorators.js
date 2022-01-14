"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRabbitMQConfig = exports.RabbitRPC = exports.RabbitSubscribe = exports.RabbitHandler = exports.makeRabbitDecorator = void 0;
const common_1 = require("../common");
const common_2 = require("@nestjs/common");
const rabbitmq_constants_1 = require("./rabbitmq.constants");
const makeRabbitDecorator = (input) => (config) => (target, key, descriptor) => {
    return (0, common_2.SetMetadata)(rabbitmq_constants_1.RABBIT_HANDLER, Object.assign(Object.assign({}, input), config))(target, key, descriptor);
};
exports.makeRabbitDecorator = makeRabbitDecorator;
const RabbitHandler = (config) => (target, key, descriptor) => (0, common_2.SetMetadata)(rabbitmq_constants_1.RABBIT_HANDLER, config)(target, key, descriptor);
exports.RabbitHandler = RabbitHandler;
exports.RabbitSubscribe = (0, exports.makeRabbitDecorator)({ type: 'subscribe' });
exports.RabbitRPC = (0, exports.makeRabbitDecorator)({ type: 'rpc' });
exports.InjectRabbitMQConfig = (0, common_1.makeInjectableDecorator)(rabbitmq_constants_1.RABBIT_CONFIG_TOKEN);
//# sourceMappingURL=rabbitmq.decorators.js.map