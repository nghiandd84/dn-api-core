"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RabbitMQModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQModule = void 0;
const discovery_1 = require("../discovery");
const modules_1 = require("../modules");
const common_1 = require("@nestjs/common");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const lodash_1 = require("lodash");
const connection_1 = require("./amqp/connection");
const rabbitmq_constants_1 = require("./rabbitmq.constants");
let RabbitMQModule = RabbitMQModule_1 = class RabbitMQModule extends (0, modules_1.createConfigurableDynamicRootModule)(rabbitmq_constants_1.RABBIT_CONFIG_TOKEN, {
    providers: [
        {
            provide: connection_1.AmqpConnection,
            useFactory: async (config) => {
                return RabbitMQModule_1.AmqpConnectionFactory(config);
            },
            inject: [rabbitmq_constants_1.RABBIT_CONFIG_TOKEN],
        },
    ],
    exports: [connection_1.AmqpConnection],
}) {
    constructor(discover, externalContextCreator, amqpConnection) {
        super();
        this.discover = discover;
        this.externalContextCreator = externalContextCreator;
        this.amqpConnection = amqpConnection;
        this.logger = new common_1.Logger(RabbitMQModule_1.name);
    }
    static async AmqpConnectionFactory(config) {
        const connection = new connection_1.AmqpConnection(config);
        await connection.init();
        const logger = new common_1.Logger(RabbitMQModule_1.name);
        logger.log('Successfully connected to RabbitMQ');
        // TODO: try to update channels
        return connection;
    }
    static build(config) {
        const logger = new common_1.Logger(RabbitMQModule_1.name);
        logger.warn('build() is deprecated. use forRoot() or forRootAsync() to configure RabbitMQ');
        return {
            module: RabbitMQModule_1,
            providers: [
                {
                    provide: connection_1.AmqpConnection,
                    useFactory: async () => {
                        return RabbitMQModule_1.AmqpConnectionFactory(config);
                    },
                },
            ],
            exports: [connection_1.AmqpConnection],
        };
    }
    static attach(connection) {
        return {
            module: RabbitMQModule_1,
            providers: [
                {
                    provide: connection_1.AmqpConnection,
                    useValue: connection,
                },
            ],
            exports: [connection_1.AmqpConnection],
        };
    }
    async onModuleDestroy() {
        this.logger.verbose('Closing AMQP Connection');
        await this.amqpConnection.managedConnection.close();
    }
    async onModuleInit() {
        if (!this.amqpConnection.configuration.registerHandlers) {
            this.logger.log('Skipping RabbitMQ Handlers due to configuration. This application instance will not receive messages over RabbitMQ');
            return;
        }
        this.logger.log('Initializing RabbitMQ Handlers');
        const rabbitMeta = await this.discover.providerMethodsWithMetaAtKey(rabbitmq_constants_1.RABBIT_HANDLER);
        const grouped = (0, lodash_1.groupBy)(rabbitMeta, (x) => x.discoveredMethod.parentClass.name);
        const providerKeys = Object.keys(grouped);
        for (const key of providerKeys) {
            this.logger.log(`Registering rabbitmq handlers from ${key}`);
            await Promise.all(grouped[key].map(async ({ discoveredMethod, meta: config }) => {
                const handler = this.externalContextCreator.create(discoveredMethod.parentClass.instance, discoveredMethod.handler, discoveredMethod.methodName);
                const { exchange, routingKey, queue } = config;
                const handlerDisplayName = `${discoveredMethod.parentClass.name}.${discoveredMethod.methodName} {${config.type}} -> ${exchange}::${routingKey}::${queue || 'amqpgen'}`;
                if (config.type === 'rpc' &&
                    !this.amqpConnection.configuration.enableDirectReplyTo) {
                    this.logger.warn(`Direct Reply-To Functionality is disabled. RPC handler ${handlerDisplayName} will not be registered`);
                    return;
                }
                this.logger.log(handlerDisplayName);
                return config.type === 'rpc'
                    ? this.amqpConnection.createRpc(handler, config)
                    : this.amqpConnection.createSubscriber(handler, config);
            }));
        }
    }
};
RabbitMQModule = RabbitMQModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [discovery_1.DiscoveryModule],
        providers: [external_context_creator_1.ExternalContextCreator],
        exports: [connection_1.AmqpConnection]
    }),
    __metadata("design:paramtypes", [discovery_1.DiscoveryService,
        external_context_creator_1.ExternalContextCreator,
        connection_1.AmqpConnection])
], RabbitMQModule);
exports.RabbitMQModule = RabbitMQModule;
//# sourceMappingURL=rabbitmq.module.js.map