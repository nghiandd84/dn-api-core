import { makeInjectableDecorator } from '../common';
import { SetMetadata } from '@nestjs/common';
import { RABBIT_CONFIG_TOKEN, RABBIT_HANDLER } from './rabbitmq.constants';
import { RabbitHandlerConfig } from './rabbitmq.interfaces';

export const makeRabbitDecorator = <T extends Partial<RabbitHandlerConfig>>(
  input: T
) => (
  config: Pick<RabbitHandlerConfig, Exclude<keyof RabbitHandlerConfig, keyof T>>
) => (target, key, descriptor) => {
  return SetMetadata(RABBIT_HANDLER, { ...input, ...config })(target, key, descriptor) as any;
}

export const RabbitHandler = (config: RabbitHandlerConfig) => (
  target,
  key,
  descriptor
) => SetMetadata(RABBIT_HANDLER, config)(target, key, descriptor);

export const RabbitSubscribe = makeRabbitDecorator({ type: 'subscribe' });

export const RabbitRPC = makeRabbitDecorator({ type: 'rpc' });

export const InjectRabbitMQConfig = makeInjectableDecorator(
  RABBIT_CONFIG_TOKEN
);
