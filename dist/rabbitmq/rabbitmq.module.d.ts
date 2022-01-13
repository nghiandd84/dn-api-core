import { DiscoveryService } from '../discovery';
import { IConfigurableDynamicRootModule } from '../modules';
import { DynamicModule, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { AmqpConnection } from './amqp/connection';
import { RabbitMQConfig } from './rabbitmq.interfaces';
declare const RabbitMQModule_base: IConfigurableDynamicRootModule<RabbitMQModule, RabbitMQConfig>;
export declare class RabbitMQModule extends RabbitMQModule_base implements OnModuleDestroy, OnModuleInit {
    private readonly discover;
    private readonly externalContextCreator;
    private readonly amqpConnection;
    private readonly logger;
    constructor(discover: DiscoveryService, externalContextCreator: ExternalContextCreator, amqpConnection: AmqpConnection);
    static AmqpConnectionFactory(config: RabbitMQConfig): Promise<AmqpConnection>;
    static build(config: RabbitMQConfig): DynamicModule;
    static attach(connection: AmqpConnection): DynamicModule;
    onModuleDestroy(): Promise<void>;
    onModuleInit(): Promise<void>;
}
export {};
